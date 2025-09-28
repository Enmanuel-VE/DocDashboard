import SectionHeading from "../molecules/SectionHeading";
import ResultsGrid from "../molecules/ResultsGrid";
import NoResults from "../atoms/NoResults";
import CardDoctor from "../molecules/CardDoctor";
import CardHospital from "../molecules/CardHospital";

import type { Doctor } from "../../types/profile";
import type { Hospital } from "../../types/hospital";

type Props = {
	search: string;
	filteredDoctors: Doctor[];
	filteredHospitals: Hospital[];
};

const SearchResults = (props: Props) => {
	const isSearching = props.search.trim().length > 0;

	if (!isSearching) return null;

	return (
		<section className="flex flex-col gap-6">
			<SectionHeading>Resultados para “{props.search}”</SectionHeading>

			{props.filteredDoctors.length > 0 && (
				<ResultsGrid
					items={props.filteredDoctors}
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

			{props.filteredHospitals.length > 0 && (
				<ResultsGrid
					items={props.filteredHospitals}
					renderItem={(hospital) => (
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
					)}
				/>
			)}

			{props.filteredDoctors.length === 0 &&
				props.filteredHospitals.length === 0 && <NoResults />}
		</section>
	);
};

export default SearchResults;
