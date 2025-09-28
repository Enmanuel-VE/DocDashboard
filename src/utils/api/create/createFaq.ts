import type { FAQ } from "../../../components/molecules/HospitalFaqSection";
import supabaseClient from "../../../lib/supabaseClient";

const createFaq = async (faq: Omit<FAQ, "id">, hospitalId: string) => {
	const { error } = await supabaseClient
		.from("hospital_faqs")
		.insert([{ ...faq, hospital_id: hospitalId }]);

	if (error) throw new Error("No se pudo crear la FAQ");
};

export default createFaq;
