import SectionHeading from "../molecules/SectionHeading";
import ResultsGrid from "../molecules/ResultsGrid";
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
	doctors: Doctor[];
	hospitals: Hospital[];
};

export default function Favorites({ doctors, hospitals }: Props) {
	return (
		<>
			<section className="flex flex-col gap-6">
				{doctors.length > 0 ? (
					<>
						<SectionHeading>
							Especialistas que te interesan
						</SectionHeading>
						<ResultsGrid
							items={doctors}
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
				{hospitals.length > 0 ? (
					<>
						<SectionHeading>
							Hospitales destacados para ti
						</SectionHeading>
						<ResultsGrid
							items={hospitals}
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
					</>
				) : (
					<></>
				)}
			</section>
		</>
	);
}
