import { useEffect, useState } from "react";
import supabaseClient from "../lib/supabaseClient";
import { SessionContext } from "./session";
import type { Profile } from "../types/profile";

interface Props {
	children: React.ReactNode;
}

export const SessionProvider = (props: Props) => {
	const [user, setUser] = useState<Profile | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUserProfile = async () => {
			const {
				data: { user: authUser },
				error: authError,
			} = await supabaseClient.auth.getUser();

			if (authError) {
				setUser(null);
				setLoading(false);
				return;
			}

			if (!authUser) {
				setUser(null);
				setLoading(false);
				return;
			}

			const { data: profile, error: profileError } = await supabaseClient
				.from("profiles")
				.select("*")
				.eq("id", authUser.id)
				.maybeSingle();

			if (profileError) {
				setUser(null);
			} else if (!profile) {
				setUser(null);
			} else {
				setUser({ ...profile, email: authUser.email });
			}

			setLoading(false);
		};

		fetchUserProfile();

		const { data: listener } = supabaseClient.auth.onAuthStateChange(() => {
			fetchUserProfile();
		});

		return () => listener.subscription.unsubscribe();
	}, []);

	return (
		<SessionContext.Provider value={{ user, loading }}>
			{props.children}
		</SessionContext.Provider>
	);
};
