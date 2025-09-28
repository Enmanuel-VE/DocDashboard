import type { FAQ } from "../../../components/molecules/HospitalFaqSection";
import supabaseClient from "../../../lib/supabaseClient";

const updateFaq = async (faqId: string, updates: Partial<FAQ>) => {
	const { error } = await supabaseClient
		.from("hospital_faqs")
		.update(updates)
		.eq("id", faqId);

	if (error) throw new Error("No se pudo actualizar la FAQ");
};

export default updateFaq;
