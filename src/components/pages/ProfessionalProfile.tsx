import { useEffect, useState } from "react";
import { useParams } from "react-router";
import supabaseClient from "../../lib/supabaseClient";

import Loading from "../atoms/Loading";
import UserProfileSection from "../organisms/UserProfileSection";
import type { Profile } from "../../types/profile";

const ProfessionalProfile = () => {
	const [profile, setProfile] = useState<Profile | null>();
	const [loading, setLoading] = useState(true);

	const params = useParams();
	const professionalId = params.professionalId || params.id;

	useEffect(() => {
		const fetchProfessional = async () => {
			try {
				const { data, error } = await supabaseClient
					.from("profiles")
					.select("*")
					.eq("id", professionalId)
					.single();

				if (error) {
					console.error("Error al cargar perfil profesional:", error);
					setProfile(null);
				} else {
					setProfile(data);
				}
			} catch (error) {
				console.error("Error fetching professional profile:", error);
				setLoading(false);
			} finally {
				setLoading(false);
			}
		};

		fetchProfessional();
	}, [professionalId]);

	if (loading) {
		return (
			<main className="h-full bg-gray-50 px-4 py-8 md:px-8">
				<div className="h-full w-full max-w-3xl mx-auto">
					<Loading />
				</div>
			</main>
		);
	}

	const isNotProfessionalRole = !profile || profile.role !== "professional";

	if (isNotProfessionalRole) {
		return (
			<main className="h-full bg-gray-50 px-4 py-8 md:px-8">
				<div className="max-w-3xl mx-auto text-center text-gray-500">
					Profesional no encontrado.
				</div>
			</main>
		);
	}

	return (
		<main className="h-full bg-gray-50 px-4 py-8 md:px-8">
			<div className="max-w-3xl mx-auto">
				<UserProfileSection {...profile} mode="viewer" />
			</div>
		</main>
	);
};

export default ProfessionalProfile;
