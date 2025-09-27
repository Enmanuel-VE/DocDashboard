import supabaseClient from "../../../../lib/supabaseClient";
import type { HospitalDetail } from "../../../organisms/HospitalTabsSection";

const updateHospital = async (
	hospital: HospitalDetail,
	hospitalId: string,
	adminId: string
) => {
	const { error } = await supabaseClient
		.from("hospitals")
		.update([{ ...hospital, admin_id: adminId }])
		.eq("id", hospitalId);

	if (error) throw new Error("No se pudo actualizar el hospital");
};

export default updateHospital;
