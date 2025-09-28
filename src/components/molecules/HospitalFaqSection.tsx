import HospitalFAQ from "../atoms/HospitalFAQ";

interface Props {
	faqs: FAQ[];
	faqSearch: string;
	setFaqSearch: (value: string) => void;
}
export type FAQ = { id: string; question: string; answer: string };

const HospitalFaqSection = (props: Props) => (
	<section className="flex flex-col gap-6">
		<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
			<h2 className="text-xl font-semibold text-gray-800">
				Preguntas frecuentes
			</h2>
			<input
				type="text"
				placeholder="Buscar pregunta frecuente..."
				value={props.faqSearch}
				onChange={(e) => props.setFaqSearch(e.target.value)}
				className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400 w-full sm:w-64"
			/>
		</div>
		<div className="flex flex-col gap-4">
			{props.faqs
				.filter(
					(faq) =>
						faq.question
							.toLowerCase()
							.includes(props.faqSearch.toLowerCase()) ||
						faq.answer
							.toLowerCase()
							.includes(props.faqSearch.toLowerCase())
				)
				.map((faq) => (
					<HospitalFAQ
						key={faq.id}
						question={faq.question}
						answer={faq.answer}
					/>
				))}
		</div>
	</section>
);

export default HospitalFaqSection;