import { Database } from "../types/supabase";

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import { Flex, Text, Link } from "@chakra-ui/react";

function Redirect(props: { redirect_to: string }) {
	const REDIRECT_WAITING_TIME = 3000;

	const [timeLeft, setTimeLeft] = useState(REDIRECT_WAITING_TIME / 1000);

	useEffect(() => {
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
		.select("redirect_to")
		.eq("link_slug", context.params.slug);

	if (error || !data[0]) {
		return {
			redirect: {
				permanent: false,
				destination: "/",
			},
		};
	}

	const redirect_to = data[0].redirect_to;

	return {
		props: { redirect_to },
	};
}

export default Redirect;
