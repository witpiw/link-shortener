import { EditableText, LinkList, Modal } from "../components";

import { Heading, Flex } from "@chakra-ui/react";
import { If, Then, Else } from "react-if";
import { useUser } from "@supabase/auth-helpers-react";

export default function Home() {
	const user = useUser();

	return (
		<>
			<Flex direction={"column"} justify={"center"} align={"center"} gap={15}>
				<Heading as="h1">Link shortener</Heading>
				<div>
					<If condition={!!user}>
						<Then>
							<Flex
								direction={"column"}
								justify="center"
								align="center"
								gap={8}
							>
								<LinkList />
								<Modal />
							</Flex>
						</Then>
						<Else>loading ...</Else>
					</If>
				</div>
			</Flex>
		</>
	);
}
