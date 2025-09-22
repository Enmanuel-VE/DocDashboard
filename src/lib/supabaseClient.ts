import { createClient } from "@supabase/supabase-js";
type SupabaseConfig = { URL: string; KEY: string };

function supabaseClient() {
	const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = import.meta.env;

	const SUPABASE: SupabaseConfig = {
		URL: VITE_SUPABASE_URL,
		KEY: VITE_SUPABASE_ANON_KEY,
	};

	if (!SUPABASE.URL || !SUPABASE.KEY) {
		throw new Error("Supabase environment variables are missing.");
	}

	return createClient(SUPABASE.URL, SUPABASE.KEY);
}

export default supabaseClient();
