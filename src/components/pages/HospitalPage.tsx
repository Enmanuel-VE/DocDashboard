import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import HospitalTemplate from "../templates/HospitalTemplate";
import HospitalTabsSection from "../organisms/HospitalTabsSection";

import fetchHospitalById from "../../utils/api/get/fetchHospitalById";
import fetchProfessionalsByHospital from "../../utils/api/get/fetchProfessionalsByHospital";
import fetchHospitalFaqs from "../../utils/api/get/fetchHospitalFaqs";

import type { Hospital } from "../../types/hospital";
import type { Doctor } from "../../types/profile";
import type { PartialFAQ } from "../../types/faq";
import { tabs, type Tab } from "../../types/tab";

interface HospitalPageProps {
	hospital?: Hospital | null;
}

const HospitalPage = ({ hospital: initialHospital }: HospitalPageProps) => {
	const { hospitalId } = useParams() as { hospitalId: string };
	const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);
	const [search, setSearch] = useState<string>("");
	const [hospital, setHospital] = useState<Hospital | null>(
		initialHospital ?? null
	);
	const [doctors, setDoctors] = useState<Doctor[]>([]);
	const [loading, setLoading] = useState(!initialHospital);
	const [faqs, setFaqs] = useState<PartialFAQ[]>([]);

	useEffect(() => {
		setHospital(initialHospital ?? null);
	}, [initialHospital]);

	const hasFetched = useRef<Record<Tab, boolean>>({
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
};

export default HospitalPage;
