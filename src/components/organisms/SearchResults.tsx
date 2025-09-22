import SectionHeading from "../molecules/SectionHeading";
import ResultsGrid from "../molecules/ResultsGrid";
import NoResults from "../atoms/NoResults";
import CardDoctor from "../molecules/CardDoctor";
import CardHospital from "../molecules/CardHospital";

type Hospital = {
	id: string;
	name: string;
	description: string;
	zone?: string;
	specialists?: number;
	services?: string[];
	image?: string;
};

type Doctor = {
	id: string;
	name: string;
	last_name: string;
	specialty?: string;
	hospital?: string;
	avatar?: string;
	rating?: number;
};

type Props = {
	search: string;
	filteredDoctors: Doctor[];
	filteredHospitals: Hospital[];
};

export default function SearchResults({
	search,
	filteredDoctors,
	filteredHospitals,
}: Props) {
	const isSearching = search.trim().length > 0;

	if (!isSearching) return null;

	return (
		<section className="flex flex-col gap-6">
			<SectionHeading>Resultados para “{search}”</SectionHeading>

			{filteredDoctors.length > 0 && (
				<ResultsGrid
					items={filteredDoctors}
					renderItem={(doctor) => (
						<CardDoctor
							key={doctor.id}
							id={doctor.id}
							name={`${doctor.name} ${doctor.last_name}`}
							specialty={doctor.specialty ?? ""}
							hospital={doctor.hospital ?? ""}
							image={doctor.avatar ?? ""}
						/>
					)}
				/>
			)}

			{filteredHospitals.length > 0 && (
				<ResultsGrid
					items={filteredHospitals}
					renderItem={(hospital) => (
						<CardHospital
							key={hospital.id}
							id={hospital.id}
							name={hospital.name}
							zone={hospital.zone ?? ""}
							description={hospital.description}
							specialists={hospital.specialists ?? 0}
							services={hospital.services ?? []}
							image={hospital.image ?? ""}
							rating={4.8}
						/>
					)}
				/>
			)}

			{filteredDoctors.length === 0 && filteredHospitals.length === 0 && (
				<NoResults />
			)}
		</section>
	);
}
