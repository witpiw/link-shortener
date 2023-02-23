import { FormEvent, useState } from "react";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Button,
	Input,
	Heading,
	FormLabel,
	Box,
	Flex,
	Divider,
	useToast,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { AuthError } from "@supabase/supabase-js";

const Login = () => {
	const [isRegistered, setIsRegistered] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const toast = useToast();

	const supabase = useSupabaseClient();

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();

		setLoading(true);

		let err: AuthError | null = null;
		let errMsg = "";

		if (isRegistered) {
			const { error, data } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			err = error;
		} else {
			if (password !== confirmPassword) {
				errMsg = "Passwords must match";
			} else {
				const { error, data } = await supabase.auth.signUp({
					email,
					password,
					options: {
						data: {
							username: email.split("@")[0]
						}
					}
				});

				err = error;
			}
		}

		if (err || errMsg) {
			toast({
				title: "Something went wrong",
				status: "error",
				description: errMsg || err?.message,
				duration: 5000,
				isClosable: true,
			});
		} else {
			router.push("/");
		}

		setLoading(false);
	}

	return (
		<Flex
			padding={10}
			direction={"column"}
			justify="center"
			align={"center"}
			h="100vh"
		>
			<Card bg={"gray.50"} shadow={"base"} maxW={500} w="100%">
				<CardHeader>
					<Heading fontSize={25} textAlign={"center"}>
						{isRegistered ? "Login" : "Register"}
					</Heading>
				</CardHeader>
				<CardBody>
					<Flex direction={"column"}>
						<form onSubmit={handleSubmit}>
							<Input
								required
								type={"email"}
								value={email}
								onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
							></Input>
							<FormLabel>Email</FormLabel>
							<Input
								required
								type={"password"}
								value={password}
								onInput={(e) =>
									setPassword((e.target as HTMLInputElement).value)
								}
							></Input>
							<FormLabel>Password</FormLabel>
							{!isRegistered && (
								<>
									<Input
										required
										type={"password"}
										value={confirmPassword}
										onInput={(e) =>
											setConfirmPassword((e.target as HTMLInputElement).value)
										}
									></Input>
									<FormLabel>Confirm password</FormLabel>
								</>
							)}
							<Flex justify={"center"} paddingTop={4}>
								<Button type="submit" isLoading={loading}>
									{isRegistered ? "Log in!" : "Register!"}
								</Button>
							</Flex>
						</form>
					</Flex>
					</CardBody>
				<Box padding={"0 5%"}>
					<Divider borderColor={"gray.400"} />
				</Box>
				<CardFooter>
					<Flex w="100%" justify={"center"}>
						<Button
							fontSize={".9rem"}
							color={"gray.700"}
							onClick={() => setIsRegistered(!isRegistered)}
							variant="link"
						>
							{isRegistered
								? "Don't have an account?"
								: "Already have an account?"}
						</Button>
					</Flex>
				</CardFooter>
			</Card>
		</Flex>
	);
};

export default Login;
