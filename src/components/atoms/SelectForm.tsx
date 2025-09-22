import type { RegisterOptions, FieldValues } from "react-hook-form";
import { useFormContext } from "react-hook-form";

interface Props {
	name: string;
	options: RegisterOptions<FieldValues, string> | undefined;
	className?: string;
	placeholder?: string;
	values: object[];
}

const SelectForm = (props: Props) => {
	const { register } = useFormContext();

	return (
		<label className={`select rounded-md ${props.className || ""}`}>
			<select
				{...register(props.name, props.options)}
				defaultValue=""
				className="w-full text-gray-500"
			>
				<option value="" disabled>
					{props.placeholder || "Selecciona una opción"}
				</option>
				{props.values.map((value, index) => (
					<option key={index} value={Object.values(value)}>
						{Object.keys(value)}
					</option>
				))}
			</select>
		</label>
	);
};

export default SelectForm;
