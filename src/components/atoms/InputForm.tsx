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
	label: string;
	isTextArea?: boolean;

	type?: HTMLInputTypeAttribute | undefined;
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

	const commonProps = {
		...register(props.name, props.options),
		placeholder: props.placeholder,
		...autoCompleteProp,
	};

	return (
		<label
			className={`flex flex-col gap-1 form-control w-full ${
				props.className || ""
			}`.trim()}
		>
			{props.label && (
				<div className="label">
					<span className="label-text">{props.label}</span>
				</div>
			)}
			{props.isTextArea ? (
				<textarea
					{...commonProps}
					className="textarea textarea-bordered h-24 w-full"
				/>
			) : (
				<div className="input w-full input-bordered flex items-center gap-2">
					{props.Icon && <props.Icon />}
					<input
						type={props.type}
						className="grow w-full"
						{...commonProps}
					/>
				</div>
			)}
		</label>
	);
};

export default InputForm;
