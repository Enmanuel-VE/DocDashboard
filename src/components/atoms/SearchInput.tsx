import React from "react";

type Props = {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
};

const SearchInput = ({ value, onChange, placeholder }: Props) => {
	return (
		<input
			type="text"
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
		/>
	);
};

export default SearchInput;
