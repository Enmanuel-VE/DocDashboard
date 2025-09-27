import supabaseClient from "../../../../lib/supabaseClient";
import type { HospitalDetail } from "../../../organisms/HospitalTabsSection";

const fetchHospitalByAdmin = async (
	adminId: string
): Promise<HospitalDetail | null> => {
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
