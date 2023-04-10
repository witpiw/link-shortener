const Chart = dynamic(
  () => import("../../components").then((mod) => mod.Chart),
  {
    ssr: false,
    loading: () => <Loading height={300} />,
  }
);

import { useEffect, useMemo, useState } from "react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Flex, Heading } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useWindowSize } from "usehooks-ts";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/router";

import { Loading } from "../../components";
import { getNextRedirect } from "../../utils";
import { useLinkOrigin } from "../../hooks";

import type { Database } from "../../types/supabase";
import type { GetServerSidePropsContext } from "next";

type Data = Database["public"]["Tables"]["links"]["Row"] & {
  link_visits: Database["public"]["Tables"]["link_visits"]["Row"][];
};

function Stats() {
  const supabase = createBrowserSupabaseClient();
  const {
    query: { slug },
    push,
  } = useRouter();

  const [stats, setStats] = useState<Data>();

  const { width } = useWindowSize();
  const link = useLinkOrigin("/" + slug);

  useEffect(() => {
    const fetchStats = async () => {
      const { data, error } = await supabase
        .from("links")
        .select(
          `
				*,
				link_visits (
					*
				)
			`
        )
        .eq("link_slug", slug);

      if (error) {
        push("/");
      } else {
        setStats(data[0] as Data);
      }
    };

    fetchStats();
  });

  const data = useMemo(() => {
    if (!stats) return [];
    return [...stats.link_visits].sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);

      return aDate.getTime() + bDate.getTime();
    });
  }, [stats]);

  const totalVisist = useMemo(() => {
    if (!stats) return [];
    return stats.link_visits.reduce((prev, curr) => {
      return prev + curr.total_visits;
    }, 0);
  }, [stats]);

  const uniqueVisist = useMemo(() => {
    if (!stats) return [];
    return stats.link_visits.reduce((prev, curr) => {
      return prev + curr.unique_visits;
    }, 0);
  }, [stats]);

  if (!stats) {
    return <Loading />;
  }

  return (
    <>
      <Flex
        width="100%"
        direction={"column"}
        justify={"center"}
        align="center"
        gap={"3rem"}
      >
        <Heading size={"lg"} textAlign={"center"}>
          Link:{" "}
          <Link style={{ textDecoration: "underline" }} href={link}>
            {link}
          </Link>
        </Heading>
        <Flex gap={"2rem"}>
          <Heading size={"md"} textAlign={"center"}>
            Total visits: {totalVisist}
          </Heading>
          <Heading size={"md"} textAlign={"center"}>
            Unique visits: {uniqueVisist}
          </Heading>
        </Flex>
        <Chart width={width > 1000 ? width / 2 : 0.8 * width} data={data} />
      </Flex>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!context.params) return;

  const supabase = createServerSupabaseClient<Database>(context);

  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    return getNextRedirect();
  }

  return { props: {} };
}

export default Stats;
