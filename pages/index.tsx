import { EditableText, LinkList, Modal } from "../components";

import { Heading, Flex } from "@chakra-ui/react";
import { If, Then, Else } from "react-if";
import { useUser } from "@supabase/auth-helpers-react";

export default function Home() {
	const user = useUser();

	return (
		<>
			<Flex direction={"column"} justify={"center"} align={"center"} gap={15}>
				<Heading>Link shortener</Heading>
				<div>
					<If condition={!!user}>
						<Then>
							Hi <EditableText initialValue={user?.user_metadata.username} />
							<hr />
							<LinkList />
							<Modal />
						</Then>
						<Else>loading ...</Else>
					</If>
				</div>
			</Flex>
		</>
	);
}
