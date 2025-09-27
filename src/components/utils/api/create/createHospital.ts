import supabaseClient from "../../../../lib/supabaseClient";
import type { HospitalDetail } from "../../../organisms/HospitalTabsSection";

type HospitalPayload = Omit<HospitalDetail, "id">;

const createHospital = async (
	hospital: HospitalPayload,
	adminId: string
): Promise<void> => {
	const { error } = await supabaseClient
		.from("hospitals")
		.insert([{ ...hospital, admin_id: adminId }]);

	if (error) throw new Error("No se pudo crear el hospital");
};

export default createHospital;
