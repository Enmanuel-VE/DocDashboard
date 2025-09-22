type Props = {
	title: string;
	children: React.ReactNode;
};

export default function Section({ title, children }: Props) {
	return (
		<section className="flex flex-col gap-6">
			<h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
			{children}
		</section>
	);
}
