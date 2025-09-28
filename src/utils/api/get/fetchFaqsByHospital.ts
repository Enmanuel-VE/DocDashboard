import supabaseClient from "../../../lib/supabaseClient";

const fetchFaqsByHospital = async (hospitalId: string) => {
	const { data, error } = await supabaseClient
		.from("hospital_faqs")
		.select("id, question, answer")
		.eq("hospital_id", hospitalId)
		.order("created_at", { ascending: true });

	if (error) {
		console.error("Error al cargar FAQs:", error);
		return [];
	}

	return data ?? [];
};

export default fetchFaqsByHospital;
