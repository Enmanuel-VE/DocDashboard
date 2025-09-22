interface HospitalFAQProps {
	question: string;
	answer: string;
}

export default function HospitalFAQ({ question, answer }: HospitalFAQProps) {
	return (
		<div className="bg-white rounded-md shadow-sm p-4">
			<h3 className="font-medium text-gray-700">{question}</h3>
			<p className="text-sm text-gray-600 mt-1">{answer}</p>
		</div>
	);
}
