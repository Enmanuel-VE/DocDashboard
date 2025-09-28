import type { Hospital } from "../../types/hospital";
import type { Doctor } from "../../types/profile";
import CardDoctor from "../molecules/CardDoctor";
import CardHospital from "../molecules/CardHospital";

type Props = {
	tabs: string[];
	activeTab: string;
	setActiveTab: (tab: string) => void;
	search: string;
	setSearch: (value: string) => void;
	filteredHospitals: Hospital[];
	filteredDoctors: Doctor[];
	loading: boolean;
};

const SearchTabsSection = (props: Props) => {
	return (
		<>
			<h1 className="text-3xl font-bold text-rose-500">
				Buscar en la plataforma
			</h1>
			{/* Tabs */}
			<div className="flex gap-4 border-b">
				{props.tabs.map((tab) => (
					<button
						key={tab}
						onClick={() => props.setActiveTab(tab)}
						className={`py-2 px-4 text-sm font-medium ${
							props.activeTab === tab
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
				value={typeof props.search === "string" ? props.search : ""}
				onChange={(e) => props.setSearch(e.target.value)}
				placeholder={`Buscar ${props.activeTab.toLowerCase()}...`}
				className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400 w-full sm:w-96"
			/>
			{/* Resultados */}
			{props.loading ? (
				<div className="text-center text-gray-500">Cargando...</div>
			) : props.activeTab === "Profesionales" ? (
				<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{props.filteredDoctors.length > 0 ? (
						props.filteredDoctors.map((doctor) => (
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
					{props.filteredHospitals.length > 0 ? (
						props.filteredHospitals.map((hospital) => (
							<CardHospital
								key={hospital.id}
								id={hospital.id}
								name={hospital.name}
								zone={hospital.zone ?? ""}
								description={hospital.description ?? ""}
								specialists={hospital.specialists ?? 0}
								services={hospital.services ?? []}
								image={hospital.image ?? ""}
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
};

export default SearchTabsSection;
