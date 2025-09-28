type Props = {
	title: string;
	children: React.ReactNode;
};

const Section = (props: Props) => {
	return (
		<section className="flex flex-col gap-6">
			<h2 className="text-2xl font-semibold text-gray-800">
				{props.title}
			</h2>
			{props.children}
		</section>
	);
};

export default Section;
