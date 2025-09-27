import { useEffect, useRef, useState } from "react";
import supabaseClient from "../../lib/supabaseClient";

import HeroSection from "../organisms/HeroSection";
import StatsSection from "../organisms/StatsSection";
import SearchResults from "../organisms/SearchResults";
import Loading from "../atoms/Loading";
import EmptyState from "../atoms/EmptyState";
import Favorites from "../organisms/Favorite";
import { useSession } from "../../context/session";

type Hospital = {
	id: string;
	name: string;
	description: string;
	zone?: string;
	specialists?: number;
	services?: string[];
	image?: string;
};

type Doctor = {
	id: string;
	name: string;
	last_name: string;
	specialty?: string;
	hospital?: string;
	avatar?: string;
	rating?: number;
};

export default function Dashboard() {
	const [search, setSearch] = useState<string>("");
	const [hospitals, setHospitals] = useState<Hospital[]>([]);
	const [doctors, setDoctors] = useState<Doctor[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const hasFetched = useRef(false);

	const { user } = useSession();

	useEffect(() => {
		if (!user || hasFetched.current) {
			setLoading(false);
			return;
		}

		const fetchData = async () => {
			try {
				setLoading(true);

				const { data: hospitalLikes } = await supabaseClient
					.from("hospital_likes")
					.select("hospital_id")
					.eq("user_id", user.id);

				const { data: doctorLikes } = await supabaseClient
					.from("professional_likes")
					.select("professional_id")
					.eq("user_id", user.id);

				if (hospitalLikes) {
					const hospitalIds =
						hospitalLikes.map((l) => l.hospital_id) ?? [];

					const { data: likedHospitalsData } =
						hospitalIds.length > 0
							? await supabaseClient
									.from("hospitals")
									.select("*")
									.in("id", hospitalIds)
							: { data: [] };
					setHospitals(likedHospitalsData ?? []);
				}

				if (doctorLikes) {
					const doctorIds =
						doctorLikes.map((l) => l.professional_id) ?? [];

					const { data: likedDoctorsData } =
						doctorIds.length > 0
							? await supabaseClient
									.from("profiles")
									.select("*")
									.in("id", doctorIds)
							: { data: [] };
					setDoctors(likedDoctorsData ?? []);
				}
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
				hasFetched.current = true;
			}
		};

		fetchData();
	}, [user]);

	const filteredHospitals = hospitals.filter((h) =>
		[h.name, h.zone, h.description, ...(h.services ?? [])]
			.join(" ")
			.toLowerCase()
			.includes(search.toLowerCase())
	);

	const filteredDoctors = doctors.filter((d) =>
		[d.name, d.last_name, d.specialty, d.hospital]
			.join(" ")
			.toLowerCase()
			.includes(search.toLowerCase())
	);

	const isSearching = search.trim().length > 0;

	return (
		<div className="h-full bg-gray-50 px-4 py-8 md:px-8">
			<main className="max-w-6xl mx-auto flex flex-col gap-12">
				<HeroSection search={search} setSearch={setSearch} />

				{loading ? (
					<div className="flex-1 flex flex-col items-center justify-center">
						<Loading />
					</div>
				) : isSearching ? (
					<SearchResults
						search={search}
						filteredDoctors={filteredDoctors}
						filteredHospitals={filteredHospitals}
					/>
				) : hospitals.length > 0 || doctors.length > 0 ? (
					<>
						<StatsSection />
						<Favorites doctors={doctors} hospitals={hospitals} />
					</>
				) : (
					<div className="flex-1 flex flex-col items-center justify-center">
						<EmptyState
							className="max-w-lg"
							message="Parece que aún no tienes favoritos. Ve a la sección de búsqueda para encontrar hospitales y profesionales que te interesen y añádelos a tus favoritos."
						/>
					</div>
				)}
			</main>
		</div>
	);
}
