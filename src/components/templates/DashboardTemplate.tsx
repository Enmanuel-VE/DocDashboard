interface Props {
	children: React.ReactNode;
}

const DashboardTemplate = (props: Props) => {
	return (
		<div className="h-full bg-gray-50 px-4 py-8 md:px-8">
			<main className="h-full max-w-6xl mx-auto flex flex-col gap-12">
				{props.children}
			</main>
		</div>
	);
};

export default DashboardTemplate;
