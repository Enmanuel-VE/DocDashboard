import { useEffect, useRef, useState } from "react";
import supabaseClient from "../../lib/supabaseClient";

import CardDoctor from "../molecules/CardDoctor";
import CardHospital from "../molecules/CardHospital";
import { useSession } from "../../context/session";
import Loading from "../atoms/Loading";

const tabs = ["Profesionales", "Hospitales"];

type Hospital = {
	id: string;
	name: string;
	description: string;
	address?: string;
	zone?: string;
	phone?: string;
	email?: string;
	image?: string;
	specialists?: number;
	services?: string[];
};

type Doctor = {
	id: string;
	name: string;
	last_name: string;
	role: "professional";
	specialty?: string;
	hospital?: string;
	avatar?: string;
	rating?: number;
};

const SearchPage = () => {
	const [activeTab, setActiveTab] = useState<string>(tabs[0]);
	const [search, setSearch] = useState<string>("");
	const [hospitals, setHospitals] = useState<Hospital[]>([]);
	const [doctors, setDoctors] = useState<Doctor[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const hasFetched = useRef(false);

	const { user } = useSession();

	useEffect(() => {
		if (!user || hasFetched.current) return;

		const fetchData = async () => {
			try {
				setLoading(true);

				const { data: hospitalData } = await supabaseClient
					.from("hospitals")
					.select("*");

				const { data: doctorData } = await supabaseClient
					.from("profiles")
					.select("*")
					.eq("role", "professional")
					.neq("id", user.id);

				setHospitals(hospitalData ?? []);
				setDoctors(doctorData ?? []);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				hasFetched.current = true;
				setLoading(false);
			}
		};

		fetchData();
	}, [user]);

	const filteredHospitals = hospitals.filter((hospital) =>
		[
			hospital.name,
			hospital.zone,
			hospital.description,
			...(hospital.services ?? []),
		]
			.join(" ")
			.toLowerCase()
			.includes(search.toLowerCase())
	);

	const filteredDoctors = doctors.filter((doctor) =>
		[doctor.name, doctor.last_name, doctor.specialty, doctor.hospital]
			.join(" ")
			.toLowerCase()
			.includes(search.toLowerCase())
	);

	return (
		<div className="flex-1 bg-gray-50 px-4 py-8 md:px-8">
			<div className="max-w-6xl mx-auto flex flex-col gap-8">
				<h1 className="text-3xl font-bold text-rose-500">
					Buscar en la plataforma
				</h1>

				{/* Tabs */}
				<div className="flex flex-row gap-3">
					<input
						type="text"
						placeholder={`Buscar ${activeTab.toLowerCase()}...`}
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400 w-full sm:w-96"
					/>

					<div className="flex flex-row bg-gray-100 rounded-md">
						{tabs.map((tab) => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab)}
								className={`cursor-pointer rounded-md py-2 px-4 text-sm font-medium ${
									activeTab === tab
										? "text-white bg-rose-500"
										: "text-gray-500 hover:text-gray-700"
								}`}
							>
								{tab}
							</button>
						))}
					</div>
				</div>
				{/* Resultados */}
				{loading ? (
					<div className="flex-1 flex flex-col items-center justify-center">
						<Loading />
					</div>
				) : activeTab === "Profesionales" ? (
					<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredDoctors.length > 0 ? (
							filteredDoctors.map((doctor) => (
								<CardDoctor
									id={doctor.id}
									key={doctor.id}
									name={`${doctor.name} ${doctor.last_name}`}
									specialty={doctor.specialty ?? ""}
									hospital={doctor.hospital ?? ""}
									image={doctor.avatar ?? ""}
								/>
							))
						) : (
							<p className="text-sm text-gray-500">
								No se encontraron profesionales.
							</p>
						)}
					</section>
				) : (
					<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredHospitals.length > 0 ? (
							filteredHospitals.map((hospital) => (
								<CardHospital
									key={hospital.id}
									id={hospital.id}
									name={hospital.name}
									zone={hospital.zone ?? ""}
									description={hospital.description ?? ""}
									specialists={hospital.specialists ?? 0}
									services={hospital.services ?? []}
									image={hospital.image ?? ""}
									rating={4.8}
								/>
							))
						) : (
							<p className="text-sm text-gray-500">
								No se encontraron hospitales.
							</p>
						)}
					</section>
				)}
			</div>
		</div>
	);
};

export default SearchPage;
