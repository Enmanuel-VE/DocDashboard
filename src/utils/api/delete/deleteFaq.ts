import supabaseClient from "../../../lib/supabaseClient";

const deleteFaq = async (faqId: string) => {
	const { error } = await supabaseClient
		.from("hospital_faqs")
		.delete()
		.eq("id", faqId);

	if (error) throw new Error("No se pudo eliminar la FAQ");
};

export default deleteFaq;
