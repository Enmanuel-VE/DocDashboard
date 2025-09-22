import CardDoctor from "../molecules/CardDoctor";
import HospitalInfoGrid from "../molecules/HospitalInfoGrid";
import HospitalFAQ from "../atoms/HospitalFAQ";
import { useState } from "react";

export type HospitalTabsSectionProps = {
	hospital: HospitalDetail;
	doctors: Doctor[];
	faqs: FAQ[];
	activeTab: string;
	setActiveTab: (tab: string) => void;
	search: string;
	setSearch: (value: string) => void;
	filteredDoctors: Doctor[];
	tabs: string[];
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

type FAQ = { question: string; answer: string };

export default function HospitalTabsSection({
	hospital,
	faqs,
	activeTab,
	setActiveTab,
	search,
	setSearch,
	filteredDoctors,
	tabs,
}: HospitalTabsSectionProps) {
	const [faqSearch, setFaqSearch] = useState("");

	return (
		<>
			<h1 className="text-3xl font-bold text-rose-500">
				{hospital.name}
			</h1>
			{/* Tabs */}
			<div className="flex gap-4 border-b">
				{tabs.map((tab) => (
					<button
						key={tab}
						onClick={() => {
							setActiveTab(tab);
							setSearch("");
						}}
						className={`py-2 px-4 text-sm font-medium ${
							activeTab === tab
								? "text-rose-500 border-b-2 border-rose-500"
								: "text-gray-500 hover:text-gray-700"
						}`}
					>
						{tab}
					</button>
				))}
			</div>
			{/* Sobre el hospital */}
			{activeTab === "Sobre el hospital" && (
				<section className="flex flex-col gap-6">
					<p className="text-gray-700">{hospital.description}</p>
					<HospitalInfoGrid
						address={hospital.address}
						zone={hospital.zone}
						phone={hospital.phone}
						email={hospital.email}
					/>
				</section>
			)}
			{/* Profesionales */}
			{activeTab === "Profesionales" && (
				<section className="flex flex-col gap-6">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
						<h2 className="text-xl font-semibold text-gray-800">
							Profesionales disponibles
						</h2>
						<input
							type="text"
							placeholder="Buscar profesional..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400 w-full sm:w-64"
						/>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredDoctors.length > 0 ? (
							filteredDoctors.map((doc) => (
								<CardDoctor
									key={doc.id}
									id={doc.id}
									name={`${doc.name} ${doc.last_name}`}
									specialty={doc.specialty ?? ""}
									hospital={hospital.name}
									image={doc.avatar ?? ""}
								/>
							))
						) : (
							<p className="text-sm text-gray-500">
								No se encontraron profesionales.
							</p>
						)}
					</div>
				</section>
			)}
			{/* FAQ */}
			{activeTab === "Preguntas frecuentes" && (
				<section className="flex flex-col gap-6">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
						<h2 className="text-xl font-semibold text-gray-800">
							Preguntas frecuentes
						</h2>
						<input
							type="text"
							placeholder="Buscar pregunta frecuente..."
							value={faqSearch}
							onChange={(e) => setFaqSearch(e.target.value)}
							className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400 w-full sm:w-64"
						/>
					</div>

					<div className="flex flex-col gap-4">
						{faqs
							.filter(
								(faq) =>
									faq.question
										.toLowerCase()
										.includes(faqSearch.toLowerCase()) ||
									faq.answer
										.toLowerCase()
										.includes(faqSearch.toLowerCase())
							)
							.map((faq, idx) => (
								<HospitalFAQ
									key={idx}
									question={faq.question}
									answer={faq.answer}
								/>
							))}
					</div>
				</section>
			)}
		</>
	);
}
