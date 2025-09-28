import supabaseClient from "../../../lib/supabaseClient";

const deleteHospital = async (hospitalId: string) => {
	const { error } = await supabaseClient
		.from("hospitals")
		.delete()
		.eq("id", hospitalId);

	if (error) throw new Error("No se pudo eliminar el hospital");
};

export default deleteHospital;
