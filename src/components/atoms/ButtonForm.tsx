import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	isPrimary?: boolean;
}

const ButtonForm = ({ children, isPrimary, ...props }: Props) => {
	const baseClass = "btn rounded-md";
	const primaryClass = "bg-rose-500 text-white";

	const finalClassName = [
		baseClass,
		isPrimary ? primaryClass : "",
		props.className || ""
	].join(" ").trim();

	return (
		<button
			{...props}
			className={finalClassName}
		>
			{children}
		</button>
	);
};

export default ButtonForm;