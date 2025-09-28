import supabaseClient from "../../../lib/supabaseClient";
import type { PartialFAQ } from "../../../types/faq";

const fetchHospitalFaqs = async (hospitalId: string): Promise<PartialFAQ[]> => {
	const { data, error } = await supabaseClient
		.from("hospital_faqs")
		.select("id, question, answer")
		.eq("hospital_id", hospitalId)
		.order("display_order", { ascending: true });

	if (error || !data) {
		console.error("Error al cargar FAQs:", error);
		return [];
	}

	return data;
};

export default fetchHospitalFaqs;
