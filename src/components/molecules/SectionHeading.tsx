type Props = { children: React.ReactNode };

const SectionHeading = ({ children }: Props) => {
	return <h2 className="text-2xl font-semibold text-gray-800">{children}</h2>;
};

export default SectionHeading;
