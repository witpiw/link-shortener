import { getNextRedirect } from "../../utils";
import { Database } from "../../types/supabase";

import type { GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

type IProps = Database["public"]["Tables"]["links"]["Row"] &
	Database["public"]["Tables"]["link_visits"]["Row"];

function Stats(props: IProps) {
	return <pre>{JSON.stringify(props, null, 4)}</pre>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	if (!context.params) return;

	const supabase = createServerSupabaseClient<Database>(context);

	const user = await supabase.auth.getUser();

	if (!user) {
		return getNextRedirect();
	}

	const { data, error } = await supabase
		.from("links")
		.select(
			`
            *,
            link_visits (
                *
            )
        `
		)
		.eq("link_slug", context.params.slug);

	if (error || !data[0]) {
		return getNextRedirect();
	}

	return {
		props: data[0],
	};
}

export default Stats;
