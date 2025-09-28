import supabaseClient from "../../../lib/supabaseClient";
import type { Hospital } from "../../../types/hospital";

const fetchHospitalById = async (
	hospitalId: string
): Promise<Hospital | null> => {
	const { data, error } = await supabaseClient
		.from("hospitals")
		.select("*")
		.eq("id", hospitalId)
		.single();

	if (error || !data) {
		console.error("Error al cargar hospital:", error);
		return null;
	}
	return data;
};

export default fetchHospitalById;
