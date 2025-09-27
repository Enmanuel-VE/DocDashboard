import { useState, type Dispatch, type SetStateAction } from "react";
import type { Tab } from "../pages/HospitalPage";
import Loading from "../atoms/Loading";
import TabBar from "../molecules/TabBar";
import HospitalOverviewSection from "../molecules/HospitalOverviewSection";
import HospitalDoctorsSection from "../molecules/HospitalDoctorsSection";
import HospitalFaqSection, { type FAQ } from "../molecules/HospitalFaqSection";

export type HospitalTabsSectionProps = {
	hospital: HospitalDetail;
	doctors: Doctor[];
	faqs: FAQ[];
	activeTab: Tab;
	setActiveTab: Dispatch<SetStateAction<Tab>>;
	search: string;
	setSearch: (value: string) => void;
	filteredDoctors: Doctor[];
	tabs: string[];
	loading: boolean;
};

export type HospitalDetail = {
	id: string;
	name: string;
	description: string;
	address: string;
	zone?: string;
	phone: string;
	email: string;
	image?: string;
	services?: string | string[];
	specialists?: number;
};

export type Doctor = {
	id: string;
	name: string;
	last_name: string;
	specialty: string | null;
	avatar: string | null;
};

const HospitalTabsSection = (props: HospitalTabsSectionProps) => {
	const [faqSearch, setFaqSearch] = useState("");

	return (
		<>
			<h1 className="text-3xl font-bold text-rose-500">
				{props.hospital.name}
			</h1>

			<TabBar
				tabs={props.tabs}
				activeTab={props.activeTab}
				setActiveTab={props.setActiveTab}
				setSearch={props.setSearch}
			/>

			{props.activeTab === "Sobre el hospital" &&
				(props.loading ? (
					<Loading className="h-full w-full" />
				) : (
					<HospitalOverviewSection hospital={props.hospital} />
				))}

			{props.activeTab === "Profesionales" &&
				(props.loading ? (
					<Loading className="h-full w-full" />
				) : (
					<HospitalDoctorsSection
						filteredDoctors={props.filteredDoctors}
						hospitalName={props.hospital.name}
						search={props.search}
						setSearch={props.setSearch}
					/>
				))}
			{props.activeTab === "Preguntas frecuentes" &&
				(props.loading ? (
					<Loading className="h-full w-full" />
				) : (
					<HospitalFaqSection
						faqSearch={faqSearch}
						faqs={props.faqs}
						setFaqSearch={setFaqSearch}
					/>
				))}
		</>
	);
};
export default HospitalTabsSection;
