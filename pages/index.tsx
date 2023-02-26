import { EditableText, LinkList } from "../components";

import { Heading, Flex } from "@chakra-ui/react";
import { If, Then, Else } from "react-if";
import { useUser } from "@supabase/auth-helpers-react";

export default function Home() {
	const user = useUser();

	return (
		<>
			<Flex direction={"column"} justify={"center"}>
				<Heading>Link shortener</Heading>
				<div>
					<If condition={!!user}>
						<Then>
							Hi <EditableText initialValue={user?.user_metadata.username} />
							<LinkList />
						</Then>
						<Else>loading ...</Else>
					</If>
				</div>
			</Flex>
		</>
	);
}
