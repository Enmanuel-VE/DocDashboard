import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

const ButtonForm = (props: Props) => {
	return (
		<button
			{...props}
			className={
				"btn bg-rose-500 text-white rounded-md " +
				(props.className ? props.className : "")
			}
		>
			{props.children}
		</button>
	);
};

export default ButtonForm;
