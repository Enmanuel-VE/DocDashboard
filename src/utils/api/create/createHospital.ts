import supabaseClient from "../../../lib/supabaseClient";
import type { Hospital } from "../../../types/hospital";

type HospitalPayload = Omit<Hospital, "id">;

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
