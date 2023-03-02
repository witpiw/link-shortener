import { Database } from "../../types/supabase";
import { useSyncListContextStore } from "../../context";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
	ListItem,
	Flex,
	Button,
	ButtonGroup,
	Divider,
	Icon,
	Link,
	useToast,
} from "@chakra-ui/react";

function LinkItem(props: Database["public"]["Tables"]["links"]["Row"]) {
	const sync = useSyncListContextStore((state) => state.sync);

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

		sync();
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
						<Icon viewBox="0 0 500 500">
							<path d="M224 0c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224zM64 160c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H288v64H64V224h64V160H64z"/>
						</Icon>
					</Button>
					<Button onClick={handleDelete}>
						<Icon viewBox="0 0 500 500">
							<path d="M0 80C0 53.5 21.5 32 48 32h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80zM64 96v64h64V96H64zM0 336c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V336zm64 16v64h64V352H64zM304 32h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H304c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48zm80 64H320v64h64V96zM256 304c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s7.2-16 16-16s16 7.2 16 16v96c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s-7.2-16-16-16s-16 7.2-16 16v64c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V304zM368 480a16 16 0 1 1 0-32 16 16 0 1 1 0 32zm64 0a16 16 0 1 1 0-32 16 16 0 1 1 0 32z"/>
						</Icon>
					</Button>
					<Button onClick={handleDelete}>
						<Icon viewBox="0 0 500 500">
							<path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
						</Icon>
					</Button>
				</ButtonGroup>
			</Flex>
			<Divider p={4} />
		</ListItem>
	);
}

export { LinkItem };
