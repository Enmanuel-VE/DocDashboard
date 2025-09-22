import type { RegisterOptions, FieldValues } from "react-hook-form";
import type { IconType } from "react-icons";
import type {
	HTMLInputAutoCompleteAttribute,
	HTMLInputTypeAttribute,
} from "react";

import { useFormContext } from "react-hook-form";

interface Props {
	options?: RegisterOptions<FieldValues, string> | undefined;
	name: string;

	type: HTMLInputTypeAttribute | undefined;
	Icon?: IconType;

	placeholder?: string;
	className?: string;
	autoComplete?: HTMLInputAutoCompleteAttribute | undefined;
}

const InputForm = (props: Props) => {
	const { register } = useFormContext();

	const autoCompleteProp = props.autoComplete
		? { autoComplete: props.autoComplete }
		: {};

	return (
		<label
			className={`input rounded-md p-4 h-auto ${
				props.className ? props.className : ""
			}`}
		>
			{props.Icon && <props.Icon className="text-gray-500" />}
			<input
				type={props.type}
				placeholder={props.placeholder}
				{...autoCompleteProp}
				{...register(props.name, props.options)}
			/>
		</label>
	);
};

export default InputForm;
