import type { Doctor } from "../../types/profile";
import CardDoctor from "./CardDoctor";

interface Props {
	search: string;
	setSearch: (value: string) => void;
	filteredDoctors: Doctor[];
	hospitalName: string;
}

const HospitalDoctorsSection = (props: Props) => (
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
						hospital={props.hospitalName}
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
);

export default HospitalDoctorsSection;
