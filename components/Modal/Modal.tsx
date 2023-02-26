import { isLink } from "../../utils";
import { useSyncListContextStore } from "../../context";

import { FormEvent, useRef, useState } from "react";
import {
	Modal as ChModal,
	useDisclosure,
	Button,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Input,
	ModalFooter,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { nanoid } from "nanoid";

function Modal() {
	const supabaseClient = useSupabaseClient();
	const user = useUser();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const initialRef = useRef(null);
	const [link, setLink] = useState("");

	const sync = useSyncListContextStore((state) => state.sync);

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();

		if (!isLink(link) || !user) return;

		let errorCode = 2305; // duplicate link_slug key

		while (errorCode == 2305) {
			const { error } = await supabaseClient
				.from("links")
				.insert({ owner: user.id, redirect_to: link, link_slug: nanoid(9) });

			errorCode = Number(error?.code);
		}

		sync();
		onClose();
	}

	return (
		<>
			<Button onClick={onOpen}>
				<AddIcon />
			</Button>

			<ChModal
				isCentered
				initialFocusRef={initialRef}
				isOpen={isOpen}
				onClose={onClose}
				size={"xl"}
			>
				<ModalOverlay backdropFilter="blur(2px)" />
				<ModalContent>
					<ModalHeader>Shorten a link</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form id="linkForm" onSubmit={handleSubmit}>
							<Input
								pattern="^(http(s)?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\- .\/?%&=]*)?$"
								required
								type={"text"}
								value={link}
								onInput={(e) => setLink((e.target as HTMLInputElement).value)}
								placeholder={"e.g. www.youtube.com/watch?v=dQw4w9WgXcQ"}
							></Input>
						</form>
					</ModalBody>

					<ModalFooter>
						<Button
							variant={"solid"}
							bg="green.400"
							_hover={{ bg: "green.300" }}
							color={"white"}
							form="linkForm"
							type="submit"
						>
							OK
						</Button>
					</ModalFooter>
				</ModalContent>
			</ChModal>
		</>
	);
}

interface Props {
	initialLink?: string;
}

export { Modal };
