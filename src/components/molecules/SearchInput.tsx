interface SearchInputProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}

export default function SearchInput({
	value,
	onChange,
	placeholder,
}: SearchInputProps) {
	const safeValue = typeof value === "string" ? value : "";
	return (
		<input
			type="text"
			placeholder={placeholder}
			value={safeValue}
			onChange={(e) => onChange(e.target.value)}
			className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400 w-full sm:w-96"
		/>
	);
}
