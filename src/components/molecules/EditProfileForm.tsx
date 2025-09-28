import {
	useFormContext,
	type FieldValues,
	type SubmitHandler,
} from "react-hook-form";
import InputForm from "../atoms/InputForm";
import { FaLink } from "react-icons/fa";

interface Props {
	onSubmit: SubmitHandler<FieldValues>;
	isProfessional?: boolean;
}

const EditProfileForm = (props: Props) => {
	const { handleSubmit } = useFormContext();

	return (
		<form
			onSubmit={handleSubmit(props.onSubmit)}
			className="flex flex-col gap-4"
		>
			<div className="flex flex-col sm:flex-row gap-4">
				<InputForm
					label="Nombre"
					name="name"
					type="text"
					autoComplete="name"
					placeholder="Nombre"
					className="w-full ms:w-1/2"
					options={{
						required: {
							value: true,
							message: "El nombre es obligatorio",
						},
					}}
				/>
				<InputForm
					label="Apellido"
					name="last_name"
					type="text"
					autoComplete="family-name"
					placeholder="Apellido"
					className="w-full ms:w-1/2"
					options={{
						required: {
							value: true,
							message: "El apellido es obligatorio",
						},
					}}
				/>
			</div>

			<InputForm
				label="Biografía"
				name="bio"
				isTextArea
				placeholder="Biografía - Puedes usar markdown para potenciar tu presentación."
				className="textarea max-h-[30dvh] w-full"
				options={{
					maxLength: {
						value: 2500,
						message: "Máximo 2500 caracteres",
					},
				}}
			/>

			<InputForm
				label="Correo"
				name="email"
				autoComplete="email"
				type="email"
				placeholder="Correo"
				className="w-full"
				options={{
					required: {
						value: true,
						message: "El correo es obligatorio",
					},
					pattern: {
						value: /^[^S@]+@[^S@]+S[^S@]+$/,
						message: "Ingrese un correo válido",
					},
				}}
			/>
			<InputForm
				label="Teléfono"
				name="phone"
				type="phone"
				placeholder="Teléfono"
				className="w-full"
				options={{
					maxLength: { value: 15, message: "Máximo 15 caracteres" },
					pattern: {
						value: /^[0-9-]+$/,
						message: "Solo se permiten números y guiones",
					},
				}}
			/>

			{props.isProfessional && (
				<>
					<InputForm
						label="Especialidad"
						name="specialty"
						type="text"
						placeholder="Especialidad"
						className="w-full"
						options={{
							required: {
								value: true,
								message: "La especialidad es obligatoria",
							},
						}}
					/>
					<InputForm
						label="Servicios"
						name="services"
						type="text"
						placeholder="Servicios (separados por coma)"
						className="w-full"
						options={{
							required: {
								value: true,
								message: "Los servicios son obligatorios",
							},
							pattern: {
								value: /^(?!\s*,)(?!.*,\s*,)(?!.*,$\\)[a-zA-ZÀ-ÿ0-9\s,]+$/,
								message:
									"Formato inválido. Ejemplo: Servicio1, Servicio2",
							},
						}}
					/>
				</>
			)}

			<InputForm
				label="Enlace del perfil"
				name="avatar"
				type="text"
				options={{}}
				Icon={FaLink}
				autoComplete="off"
				className="w-full"
				placeholder="Añade el enlace del perfil"
			/>

			<button className="btn bg-rose-500 text-white" type="submit">
				Guardar cambios
			</button>
		</form>
	);
};

export default EditProfileForm;
