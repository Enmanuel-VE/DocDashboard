import CardDoctor from "../molecules/CardDoctor";
import HospitalInfoGrid from "../molecules/HospitalInfoGrid";
import HospitalFAQ from "../atoms/HospitalFAQ";
import { useState } from "react";
import Markdown from "react-markdown";

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

const HospitalTabsSection = (props: HospitalTabsSectionProps) => {
	const [faqSearch, setFaqSearch] = useState("");

	return (
		<>
			<h1 className="text-3xl font-bold text-rose-500">
				{props.hospital.name}
			</h1>
			{/* Tabs */}
			<div className="flex flex-row-reverse bg-gray-100 rounded-md">
				{props.tabs.map((tab) => (
					<button
						key={tab}
						onClick={() => {
							props.setActiveTab(tab);
							props.setSearch("");
						}}
						className={`cursor-pointer py-2 px-4 text-sm font-medium ${
							props.activeTab === tab
								? "bg-rose-500  text-white rounded-md"
								: "text-gray-500 hover:text-gray-700"
						}`}
					>
						{tab}
					</button>
				))}
			</div>
			{/* Sobre el hospital */}
			{props.activeTab === "Sobre el hospital" && (
				<section className="flex flex-col gap-6">
					<div className="prose prose-sm max-w-none text-gray-700">
						<Markdown
							components={{
								p: ({ ...props }) => (
									<p
										className="mb-4 leading-relaxed text-sm text-gray-700"
										{...props}
									/>
								),
								h2: ({ ...props }) => (
									<h2
										className="text-lg font-semibold text-gray-800 mt-5 mb-2 border-b pb-1"
										{...props}
									/>
								),
								ul: ({ ...props }) => (
									<ul
										className="list-disc list-inside mb-4 text-sm text-gray-700"
										{...props}
									/>
								),
								ol: ({ ...props }) => (
									<ol
										className="list-decimal list-inside mb-4 text-sm text-gray-700"
										{...props}
									/>
								),
								li: ({ ...props }) => (
									<li
										className="mb-1 text-sm text-gray-700"
										{...props}
									/>
								),
								a: ({ ...props }) => (
									<a
										className="text-sm text-rose-600 underline hover:text-rose-700 transition-colors"
										target="_blank"
										rel="noopener noreferrer"
										{...props}
									/>
								),
								blockquote: ({ ...props }) => (
									<blockquote
										className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4"
										{...props}
									/>
								),
							}}
						>
							{props.hospital.description}
						</Markdown>
					</div>

					<HospitalInfoGrid
						address={props.hospital.address}
						zone={props.hospital.zone}
						phone={props.hospital.phone}
						email={props.hospital.email}
					/>
				</section>
			)}
			{/* Profesionales */}
			{props.activeTab === "Profesionales" && (
				<section className="flex flex-col gap-6">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
						<h2 className="text-xl font-semibold text-gray-800">
							Profesionales disponibles
						</h2>
						<input
							type="text"
							placeholder="Buscar profesional..."
							value={props.search}
							onChange={(e) => props.setSearch(e.target.value)}
							className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400 w-full sm:w-64"
						/>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{props.filteredDoctors.length > 0 ? (
							props.filteredDoctors.map((doc) => (
								<CardDoctor
									key={doc.id}
									id={doc.id}
									name={`${doc.name} ${doc.last_name}`}
									specialty={doc.specialty ?? ""}
									hospital={props.hospital.name}
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
			{props.activeTab === "Preguntas frecuentes" && (
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
						{props.faqs
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
};
export default HospitalTabsSection;
