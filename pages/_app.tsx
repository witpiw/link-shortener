import type { AppProps } from "next/app";
import { Database } from "../types/supabase";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";

import "@fontsource/montserrat";

function MyApp({
	Component,
	pageProps,
}: AppProps<{
	initialSession: Session;
}>) {
	const [supabaseClient] = useState(() =>
		createBrowserSupabaseClient<Database>()
	);

	return (
		<SessionContextProvider
			supabaseClient={supabaseClient}
			initialSession={pageProps.initialSession}
		>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</SessionContextProvider>
	);
}

export default MyApp;
