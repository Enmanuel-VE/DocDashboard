type HospitalTemplateProps = {
	children: React.ReactNode;
};

export default function HospitalTemplate({ children }: HospitalTemplateProps) {
	return (
		<main className="h-full w-full bg-gray-50 px-4 py-8 md:px-8">
			<div className="h-full max-w-6xl mx-auto flex flex-col py-8 gap-8">
				{children}
			</div>
		</main>
	);
}
