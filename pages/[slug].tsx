import { Database } from "../types/supabase";

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import type { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import { Flex, Text, Link } from "@chakra-ui/react";

const REDIRECT_WAITING_TIME = 3000;

function Redirect(props: Database["public"]["Tables"]["links"]["Row"]) {
	const [timeLeft, setTimeLeft] = useState(REDIRECT_WAITING_TIME / 1000);
	const supabase = useSupabaseClient();

	async function gatherStatsData() {
		const date = new Date();

		const formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

		const { data, count, error } = await supabase
			.from("link_visits")
			.select("*", { count: "exact", head: true })
			.eq("link_id", props.id)
			.eq("date", formattedDate);

		if (error) {
			console.log("1" + error.message);
			return;
		}

		if (count === 0 || !count) {
			const { error } = await supabase.from("link_visits").insert({
				date: formattedDate,
				link_id: props.id,
				total_visits: 1,
				unique_visits: 1,
			});

			if (error) {
				console.log("2" + error.message);
				return;
			}
		}

		await supabase.rpc("increment_total", {
			link_uuid: props.id,
			visit_date: formattedDate,
		});

		if (!window.localStorage.getItem("visited")) {
			window.localStorage.setItem("visited", "true");
			await supabase.rpc("increment_unique", {
				link_uuid: props.id,
				visit_date: formattedDate,
			});
		}
	}

	useEffect(() => {
		(async () => await gatherStatsData())();

		const intervalId = setInterval(() => {
			setTimeLeft((timeLeft) => timeLeft - 1);
		}, 1000);

		const timeoutId = setTimeout(() => {
			location.href = props.redirect_to;
		}, REDIRECT_WAITING_TIME);

		return () => {
			clearInterval(intervalId);
			clearTimeout(timeoutId);
		};
	}, []);

	return (
		<>
			<Text pt={20} h="10vh" textAlign={"center"} fontSize={"2xl"}>
				You will be redirected in {timeLeft}
			</Text>
			<Text fontSize={"xs"} h="5vh" textAlign={"center"} pt={10}>
				or simply click{" "}
				<Link textDecoration={"underline"} href={props.redirect_to}>
					here
				</Link>
			</Text>
			<Flex
				h="85vh"
				justifyContent={"center"}
				alignItems={"center"}
				direction={"column"}
			>
				<Text>(annoying ads)</Text>
			</Flex>
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	if (!context.params) return;

	const supabase = createServerSupabaseClient<Database>(context);

	const { data, error } = await supabase
		.from("links")
		.select("*")
		.eq("link_slug", context.params.slug);

	if (error || !data[0]) {
		return {
			redirect: {
				permanent: false,
				destination: "/",
			},
		};
	}

	return {
		props: data[0],
	};
}

export default Redirect;
