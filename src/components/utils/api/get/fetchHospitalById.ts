import supabaseClient from "../../../../lib/supabaseClient";

const fetchHospitalById = async (hospitalId: string) => {
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
