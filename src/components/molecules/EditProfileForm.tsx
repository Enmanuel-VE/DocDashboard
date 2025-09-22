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

function EditProfileForm(props: Props) {
	const { handleSubmit, register } = useFormContext();

	return (
		<form
			onSubmit={handleSubmit(props.onSubmit)}
			className="flex flex-col gap-4"
		>
			<div className="flex flex-col sm:flex-row gap-4">
				<InputForm
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
			<textarea
				placeholder="Biografía"
				className="textarea max-h-[30dvh] w-full"
				{...register("bio", {
					maxLength: { value: 500, message: "Máximo 500 caracteres" },
				})}
			></textarea>
			<InputForm
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
						value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
						message: "Ingrese un correo válido",
					},
				}}
			/>
			<InputForm
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
								value: /^(?!\s*,)(?!.*,\s*,)(?!.*,$)[a-zA-ZÀ-ÿ0-9\s,]+$/,
								message:
									"Formato inválido. Ejemplo: Servicio1, Servicio2",
							},
						}}
					/>
				</>
			)}

			<InputForm
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
}

export default EditProfileForm;
