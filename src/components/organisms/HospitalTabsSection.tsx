import { useState, type Dispatch, type SetStateAction } from "react";
import Loading from "../atoms/Loading";
import TabBar from "../molecules/TabBar";
import HospitalOverviewSection from "../molecules/HospitalOverviewSection";
import HospitalDoctorsSection from "../molecules/HospitalDoctorsSection";
import HospitalFaqSection from "../molecules/HospitalFaqSection";

import type { Hospital } from "../../types/hospital";
import type { Doctor } from "../../types/profile";
import type { PartialFAQ } from "../../types/faq";
import type { Tab } from "../../types/tab";

interface Props {
	hospital: Hospital;
	tabs: Tab[];
	activeTab: Tab;
	setActiveTab: Dispatch<SetStateAction<Tab>>;
	search: string;
	setSearch: (value: string) => void;
	filteredDoctors: Doctor[];
	faqs: PartialFAQ[];
	loading: boolean;
}

const HospitalTabsSection = (props: Props) => {
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
