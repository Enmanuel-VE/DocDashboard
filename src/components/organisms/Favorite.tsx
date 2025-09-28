import SectionHeading from "../molecules/SectionHeading";
import ResultsGrid from "../molecules/ResultsGrid";
import CardDoctor from "../molecules/CardDoctor";
import CardHospital from "../molecules/CardHospital";
import type { Hospital } from "../../types/hospital";
import type { Doctor } from "../../types/profile";

interface Props {
	doctors: Doctor[];
	hospitals: Hospital[];
}

const Favorites = (props: Props) => {
	return (
		<>
			<section className="flex flex-col gap-6">
				{props.doctors.length > 0 ? (
					<>
						<SectionHeading>
							Especialistas que te interesan
						</SectionHeading>
						<ResultsGrid
							items={props.doctors}
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
					</>
				) : (
					<></>
				)}
			</section>

			<section className="flex flex-col gap-6">
				{props.hospitals.length > 0 ? (
					<>
						<SectionHeading>
							Hospitales destacados para ti
						</SectionHeading>
						<ResultsGrid
							items={props.hospitals}
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
					</>
				) : (
					<></>
				)}
			</section>
		</>
	);
};

export default Favorites;
