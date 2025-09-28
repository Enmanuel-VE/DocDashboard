import supabaseClient from "../../../lib/supabaseClient";
import type { Hospital } from "../../../types/hospital";

export const fetchHospitalsByProfessional = async (
	profileId: string
): Promise<Hospital[]> => {
	const { data: rows, error } = await supabaseClient
		.from("hospital_professionals")
		.select("hospitals!hospital_professionals_hospital_id_fkey(*)")
		.eq("profile_id", profileId);

	if (error) {
		console.error("Error cargando hospitales:", error);
		return [];
	}

	return rows
		.map((r) => r.hospitals)
		.flat()
		.map((h: Hospital) => ({
			id: h.id,
			name: h.name,
			zone: h.zone,
			description: h.description,
			specialists: h.specialists,
			services: h.services,
			image: h.image,
		}));
};

export default fetchHospitalsByProfessional;
