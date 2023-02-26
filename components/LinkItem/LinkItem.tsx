import { Database } from "../../types/supabase";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
	ListItem,
	Flex,
	Button,
	ButtonGroup,
	Link,
	useToast,
} from "@chakra-ui/react";
import { DeleteIcon, CopyIcon } from "@chakra-ui/icons";

function LinkItem(props: Database["public"]["Tables"]["links"]["Row"]) {
	const toast = useToast();
	const supabase = useSupabaseClient();

	async function handleDelete() {
		const { error } = await supabase.from("links").delete().eq("id", props.id);

		if (error) {
			toast({
				title: "Something went wrong",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	}

	function handleCopy() {
		navigator.clipboard.writeText(location.href + props.link_slug);

		toast({
			title: "Copied to clipboard!",
			duration: 3000,
			isClosable: true,
			variant: "subtle",
			position: "top-right",
		});
	}

	return (
		<ListItem maxW={"80%"} p="4">
			<Flex
				direction={{ base: "column", md: "row" }}
				justifyContent={"center"}
				alignItems={"center"}
				gap={6}
			>
				<Link
					href={props.redirect_to}
					target={"_blank"}
					maxW={{ md: "30%", base: "100%" }}
					whiteSpace={"nowrap"}
					overflow={"hidden"}
					textOverflow={"ellipsis"}
				>
					{props.redirect_to}
				</Link>
				<Link
					href={location.href + props.link_slug}
					target={"_blank"}
					maxW="100%"
					whiteSpace={"nowrap"}
					overflow={"hidden"}
					textOverflow={"ellipsis"}
				>
					{location.href + props.link_slug}
				</Link>
				<ButtonGroup gap={2}>
					<Button onClick={handleCopy}>
						<CopyIcon />
					</Button>
					<Button onClick={handleDelete}>
						<DeleteIcon />
					</Button>
				</ButtonGroup>
			</Flex>
		</ListItem>
	);
}

export { LinkItem };
