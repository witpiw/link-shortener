const Chart = dynamic(() => import('../../components').then((mod) => mod.Chart), {
	ssr: false,
	loading: () => <Loading height={300}/>
});

import { useMemo } from 'react';
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Flex, Heading } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useWindowSize } from 'usehooks-ts';

import { Loading } from '../../components';
import { getNextRedirect } from "../../utils";
import {useLinkOrigin} from '../../hooks';

import type { Database } from "../../types/supabase";
import type { GetServerSidePropsContext } from "next";
import Link from 'next/link';

type IProps = Database["public"]["Tables"]["links"]["Row"] & {link_visits:Database["public"]["Tables"]["link_visits"]["Row"][] };


function Stats(props: IProps) {
	const {width} = useWindowSize()
	const link = useLinkOrigin("/" + props.link_slug)

	const data = useMemo(() => {
		return [...props.link_visits].sort((a,b) => {
			const aDate = new Date(a.date)
			const bDate = new Date(b.date)

			return aDate.getTime() + bDate.getTime()
		})
	}, [props.link_visits])

	const totalVisist = useMemo(() => {
		return props.link_visits.reduce((prev,curr) => {
			return prev + curr.total_visits
		}, 0)
	}, [props.link_visits])

	const uniqueVisist = useMemo(() => {
		return props.link_visits.reduce((prev,curr) => {
			return prev + curr.unique_visits
		}, 0)
	}, [props.link_visits])

	return (
		<>
			<Flex width="100%" direction={"column"} justify={"center"} align="center" gap={"3rem"}>
				<Heading size={"lg"} textAlign={"center"}>Link: <Link style={{textDecoration: "underline"}} href={link}>{link}</Link></Heading>
				<Flex gap={"2rem"}>
					<Heading size={"md"} textAlign={"center"}>Total visits: {totalVisist}</Heading>
					<Heading size={"md"} textAlign={"center"}>Unique visits: {uniqueVisist}</Heading>
				</Flex>
				<Chart width={width > 1000 ? width / 2 : 0.8 * width} data={data}/>
			</Flex>
		</>
	)
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	if (!context.params) return;

	const supabase = createServerSupabaseClient<Database>(context);

	const user = await supabase.auth.getUser();

	if (!user) {
		return getNextRedirect();
	}

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
		.eq("link_slug", context.params.slug);

	if (error || !data[0]) {
		return getNextRedirect();
	}

	return {
		props: data[0],
	};
}

export default Stats;
