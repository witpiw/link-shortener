import type { AppProps } from "next/app";
import { Database } from "../types/supabase";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";

import "@fontsource/montserrat";
import { Header } from "../components";

const EXCLUDED_FROM_LAYOUT = ['/[slug]']

function MyApp({
	Component,
	pageProps,
	...appProps
}: AppProps<{
	initialSession: Session;
}>) {
	const [supabaseClient] = useState(() =>
		createBrowserSupabaseClient<Database>()
	);

	const pageContent = () => EXCLUDED_FROM_LAYOUT.includes(appProps.router.pathname) ? <Component {...pageProps} /> : <><Header/><Component {...pageProps} /></>

	return (
		<SessionContextProvider
			supabaseClient={supabaseClient}
			initialSession={pageProps.initialSession}
		>
			<ChakraProvider theme={theme}>
				{pageContent()}
			</ChakraProvider>
		</SessionContextProvider>
	);
}

export default MyApp;
