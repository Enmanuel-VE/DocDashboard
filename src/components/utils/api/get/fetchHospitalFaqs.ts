import supabaseClient from "../../../../lib/supabaseClient";

const fetchHospitalFaqs = async (hospitalId: string) => {
	const { data, error } = await supabaseClient
		.from("hospital_faqs")
		.select("question, answer")
		.eq("hospital_id", hospitalId)
		.order("display_order", { ascending: true });

	if (error) {
		console.error("Error al cargar FAQs:", error);
		return [];
	}

	return data ?? [];
};

export default fetchHospitalFaqs;
