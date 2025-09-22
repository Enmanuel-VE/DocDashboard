import CardDoctor from "../molecules/CardDoctor";
import CardHospital from "../molecules/CardHospital";

export type Hospital = {
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

export type Doctor = {
	id: string;
	name: string;
	last_name: string;
	role: "professional";
	specialty?: string;
	hospital?: string;
	avatar?: string;
	rating?: number;
};

export type SearchTabsSectionProps = {
	tabs: string[];
	activeTab: string;
	setActiveTab: (tab: string) => void;
	search: string;
	setSearch: (value: string) => void;
	filteredHospitals: Hospital[];
	filteredDoctors: Doctor[];
	loading: boolean;
};

export default function SearchTabsSection({
	tabs,
	activeTab,
	setActiveTab,
	search,
	setSearch,
	filteredHospitals,
	filteredDoctors,
	loading,
}: SearchTabsSectionProps) {
	return (
		<>
			<h1 className="text-3xl font-bold text-rose-500">
				Buscar en la plataforma
			</h1>
			{/* Tabs */}
			<div className="flex gap-4 border-b">
				{tabs.map((tab) => (
					<button
						key={tab}
						onClick={() => setActiveTab(tab)}
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
			{/* Buscador */}
			<input
				type="text"
				value={typeof search === "string" ? search : ""}
				onChange={(e) => setSearch(e.target.value)}
				placeholder={`Buscar ${activeTab.toLowerCase()}...`}
				className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400 w-full sm:w-96"
			/>
			{/* Resultados */}
			{loading ? (
				<div className="text-center text-gray-500">Cargando...</div>
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
		</>
	);
}
