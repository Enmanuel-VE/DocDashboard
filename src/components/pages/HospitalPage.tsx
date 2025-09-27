import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import HospitalTemplate from "../templates/HospitalTemplate";
import HospitalTabsSection from "../organisms/HospitalTabsSection";

import fetchProfessionalsByHospital from "../utils/api/get/fetchProfessionalsByHospital";
import fetchHospitalFaqs from "../utils/api/get/fetchHospitalFaqs";
import fetchHospitalById from "../utils/api/get/fetchHospitalById";

const tabs = [
	"Sobre el hospital",
	"Profesionales",
	"Preguntas frecuentes",
] as const;

export type Tab = (typeof tabs)[number];

type HospitalDetail = {
	id: string;
	name: string;
	description: string;
	address: string;
	zone?: string;
	phone: string;
	email: string;
	map_embed?: string;
};

type Doctor = {
	id: string;
	name: string;
	last_name: string;
	specialty: string | null;
	avatar: string | null;
};

type HospitalPageProps = {
	hospital?: HospitalDetail | null;
};

export default function HospitalPage({
	hospital: initialHospital,
}: HospitalPageProps) {
	const { hospitalId } = useParams() as { hospitalId: string };
	const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);
	const [search, setSearch] = useState<string>("");
	const [hospital, setHospital] = useState<HospitalDetail | null>(
		initialHospital ?? null
	);
	const [doctors, setDoctors] = useState<Doctor[]>([]);
	const [loading, setLoading] = useState(!initialHospital);
	const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>(
		[]
	);

	useEffect(() => {
		setHospital(initialHospital ?? null);
	}, [initialHospital]);

	const hasFetched = useRef({
		[tabs[0]]: !!initialHospital,
		[tabs[1]]: false,
		[tabs[2]]: false,
	});

	useEffect(() => {
		const hospitalIdentifier = hospital?.id ?? hospitalId;
		if (!hospitalIdentifier || hasFetched.current[activeTab]) return;

		const fetchData = async () => {
			try {
				setLoading(true);
				switch (activeTab) {
					case tabs[0]: {
						if (!hospital) {
							const hospitalData = await fetchHospitalById(
								hospitalIdentifier
							);
							setHospital(hospitalData);
						}
						break;
					}
					case tabs[1]: {
						const doctorsData = await fetchProfessionalsByHospital(
							hospitalIdentifier
						);
						setDoctors(doctorsData);
						break;
					}
					case tabs[2]: {
						const faqsData = await fetchHospitalFaqs(
							hospitalIdentifier
						);
						setFaqs(faqsData);
						break;
					}
					default:
						break;
				}
				hasFetched.current[activeTab] = true;
			} catch (error) {
				console.error("Error al cargar datos del tab:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [hospitalId, activeTab, hospital]);

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
		<HospitalTabsSection
			hospital={hospital}
			doctors={doctors}
			faqs={faqs}
			activeTab={activeTab}
			setActiveTab={setActiveTab}
			search={search}
			setSearch={setSearch}
			filteredDoctors={filteredDoctors}
			tabs={[...tabs]}
			loading={loading}
		/>
	);
}
