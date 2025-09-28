import supabaseClient from "../../../lib/supabaseClient";
import type { Hospital } from "../../../types/hospital";

const fetchHospitalByAdmin = async (
	adminId: string
): Promise<Hospital | null> => {
	const { data, error } = await supabaseClient
		.from("hospitals")
		.select("*")
		.eq("admin_id", adminId)
		.maybeSingle();

	if (error && error.code !== "PGRST116") {
		console.error("Error al verificar hospital existente:", error);
		return null;
	}

	return data ?? null;
};

export default fetchHospitalByAdmin;
