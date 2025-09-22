import { useEffect, useState } from "react";
import supabaseClient from "../../lib/supabaseClient";

import Loading from "../atoms/Loading";
import { useParams } from "react-router";
import HospitalTemplate from "../templates/HospitalTemplate";
import HospitalTabsSection from "../organisms/HospitalTabsSection";

const tabs = ["Sobre el hospital", "Profesionales", "Preguntas frecuentes"];

type HospitalDetail = {
	id: string;
	name: string;
	description: string;
	address: string;
	zone?: string;
	phone: string;
	email: string;
	map_embed: string;
};

type Doctor = {
	id: string;
	name: string;
	last_name: string;
	specialty: string | null;
	avatar: string | null;
};

type PivotRow = {
	profiles: Doctor[];
};

export default function HospitalPage() {
	const { hospitalId } = useParams() as { hospitalId: string };
	const [activeTab, setActiveTab] = useState<string>(tabs[0]);
	const [search, setSearch] = useState<string>("");

	const [hospital, setHospital] = useState<HospitalDetail | null>(null);
	const [doctors, setDoctors] = useState<Doctor[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>(
		[]
	);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);

			const { data: hospitalData, error: hospError } =
				await supabaseClient
					.from("hospitals")
					.select("*")
					.eq("id", hospitalId)
					.single();

			if (hospError || !hospitalData) {
				console.error("Error al cargar hospital:", hospError);
				setHospital(null);
				setLoading(false);
				return;
			}
			setHospital(hospitalData);

			const { data: pivotRows, error: pivotError } = await supabaseClient
				.from("hospital_professionals")
				.select(
					"profiles:profiles!hospital_professionals_profile_id_fkey(*)"
				)
				.eq("hospital_id", hospitalId);

			if (pivotError) {
				console.error("Error al cargar profesionales:", pivotError);
				setDoctors([]);
			} else {
				const profs: Doctor[] = (
					(pivotRows as PivotRow[]) ?? []
				).flatMap((row) => row.profiles);

				console.log("Fetched professionals:", profs);
				setDoctors(profs);
			}
			setLoading(false);
		}

		fetchData();
	}, [hospitalId]);

	useEffect(() => {
		async function fetchFaqs() {
			const { data, error } = await supabaseClient
				.from("hospital_faqs")
				.select("question, answer")
				.eq("hospital_id", hospitalId)
				.order("display_order", { ascending: true });
			if (error) {
				setFaqs([]);
			} else {
				setFaqs(data ?? []);
			}
		}
		fetchFaqs();
	}, [hospitalId, setFaqs]);

	if (loading) {
		return (
			<HospitalTemplate>
				<div className="flex flex-col h-full items-center justify-center">
					<Loading />
				</div>
			</HospitalTemplate>
		);
	}

	if (!hospital) {
		return (
			<HospitalTemplate>
				<div className="text-center text-gray-500">
					Hospital no encontrado.
				</div>
			</HospitalTemplate>
		);
	}

	const filteredDoctors = doctors.filter((doc) =>
		[doc.name, doc.last_name, doc.specialty]
			.join(" ")
			.toLowerCase()
			.includes(search.toLowerCase())
	);

	return (
		<HospitalTemplate>
			<HospitalTabsSection
				hospital={hospital}
				doctors={doctors}
				faqs={faqs}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				search={search}
				setSearch={setSearch}
				filteredDoctors={filteredDoctors}
				tabs={tabs}
			/>
		</HospitalTemplate>
	);
}
