import supabaseClient from "../../../../lib/supabaseClient";
import type { Doctor } from "../../../organisms/HospitalTabsSection";

const fetchProfessionalsByHospital = async (hospitalId: string) => {
	const { data, error } = await supabaseClient
		.from("hospital_professionals")
		.select("profiles:profiles!hospital_professionals_profile_id_fkey(*)")
		.eq("hospital_id", hospitalId);

	if (error) {
		console.error("Error al cargar profesionales:", error);
		return [];
	}

	const profs: Doctor[] = (data ?? []).flatMap((row) => row.profiles);

	return profs;
};

export default fetchProfessionalsByHospital;
