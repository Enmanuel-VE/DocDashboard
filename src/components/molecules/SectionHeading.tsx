type Props = { children: React.ReactNode };

export default function SectionHeading({ children }: Props) {
	return <h2 className="text-2xl font-semibold text-gray-800">{children}</h2>;
}
