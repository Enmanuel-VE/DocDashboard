import { IoMdPin } from "react-icons/io";
import ButtonForm from "../atoms/ButtonForm";
import InputForm from "../atoms/InputForm";
import { FaHome, FaImages, FaMapMarked, FaPhone } from "react-icons/fa";
import {
	useFormContext,
	type FieldValues,
	type SubmitHandler,
} from "react-hook-form";
import { MdEmail, MdOutlineMedicalServices } from "react-icons/md";
import type { Hospital } from "../../types/hospital";

interface Props {
	onSubmit: SubmitHandler<FieldValues | Hospital>;
	hospital: Hospital | null;
	handleDelete: () => Promise<void>;
}

const HospitalForm = (props: Props) => {
	const { handleSubmit } = useFormContext();

	return (
		<form
			onSubmit={handleSubmit(props.onSubmit)}
			className="flex flex-col w-full gap-3"
		>
			<InputForm
				label="Nombre del hospital"
				name="name"
				type="text"
				Icon={FaHome}
				options={{
					required: {
						value: true,
						message: "El nombre del hospital es obligatorio",
					},
				}}
				autoComplete="off"
				placeholder="Nombre del hospital"
				className="w-full"
			/>

			<InputForm
				label="Descripción del hospital"
				name="description"
				isTextArea
				options={{
					required: {
						value: true,
						message: "La descripción del hospital es obligatoria",
					},
					maxLength: {
						value: 4000,
						message: "Máximo 4000 caracteres",
					},
				}}
				placeholder="Descripción del hospital"
				className="w-full"
			/>
			<div className="flex flex-col sm:flex-row gap-4">
				<InputForm
					label="Dirección"
					name="address"
					options={{
						required: {
							value: true,
							message: "La dirección del hospital es obligatoria",
						},
					}}
					type="text"
					Icon={IoMdPin}
					autoComplete="off"
					className="w-full"
					placeholder="Dirección"
				/>
				<InputForm
					label="Zona"
					name="zone"
					options={{
						required: {
							value: true,
							message: "La zona del hospital es obligatoria",
						},
					}}
					type="text"
					Icon={FaMapMarked}
					autoComplete="off"
					className="w-full"
					placeholder="Zona"
				/>
			</div>
			<InputForm
				label="Teléfono"
				name="phone"
				options={{
					required: {
						value: true,
						message: "El teléfono del hospital es obligatorio",
					},
				}}
				type="text"
				Icon={FaPhone}
				autoComplete="off"
				className="w-full"
				placeholder="Teléfono"
			/>
			<InputForm
				label="Correo electrónico"
				name="email"
				type="email"
				placeholder="Correo electrónico"
				options={{
					required: {
						value: true,
						message:
							"El correo electrónico del hospital es obligatorio",
					},
					pattern: {
						value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
						message: "Ingrese un correo válido",
					},
				}}
				Icon={MdEmail}
				autoComplete="off"
				className="w-full"
			/>

			<InputForm
				label="URL de imagen"
				name="image"
				type="text"
				placeholder="URL de imagen"
				options={{
					required: {
						value: true,
						message:
							"La URL de la imagen del hospital es obligatoria",
					},
				}}
				Icon={FaImages}
				autoComplete="off"
				className="w-full"
			/>

			<InputForm
				label="Servicios"
				name="services"
				type="text"
				placeholder="Servicios (separados por coma)"
				options={{
					required: {
						value: true,
						message: "Los servicios son obligatorios",
					},
				}}
				Icon={MdOutlineMedicalServices}
				autoComplete="off"
				className="w-full"
			/>

			{!props.hospital ? (
				<ButtonForm type="submit" isPrimary>
					Crear hospital
				</ButtonForm>
			) : (
				<div className="flex flex-row justify-center gap-4">
					<ButtonForm
						onClick={props.handleDelete}
						className="flex-1/2"
						type="button"
					>
						Eliminar hospital
					</ButtonForm>

					<ButtonForm className="flex-1/2" type="submit" isPrimary>
						Actualizar hospital
					</ButtonForm>
				</div>
			)}
		</form>
	);
};

export default HospitalForm;
