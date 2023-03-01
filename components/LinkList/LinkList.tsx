import LinkItem from "../LinkItem";
import { useSyncListContextStore } from "../../context";

import { List, Flex } from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

function LinkList() {
	const sync = useSyncListContextStore((state) => state.syncCount);

	const [links, setLinks] = useState<any[]>([]);
	const supabaseClient = useSupabaseClient();
	const user = useUser();

	useEffect(() => {
		async function fetchLinks() {
			if (!user) return;

			const { data } = await supabaseClient
				.from("links")
				.select("*")
				.eq("owner", user.id);

			setLinks(data || []);
		}

		fetchLinks();
	}, [user, sync]);

	return (
		<List maxW={"100vw"}>
			<Flex direction={"column"} justify="center" align={"center"} gap={4}>
				{links.map((item, idx) => (
					<LinkItem {...item} key={idx} />
				))}
			</Flex>
		</List>
	);
}

export { LinkList };
