import type { SubmitHandler, FieldValues } from "react-hook-form";

import { MdEmail, MdLock } from "react-icons/md";
import { useFormContext } from "react-hook-form";
import { FaUser } from "react-icons/fa";

import SelectForm from "../atoms/SelectForm";
import InputForm from "../atoms/InputForm";
import SuccessfulRegistration from "./SuccessfulRegistration";
import type { Dispatch, SetStateAction } from "react";

interface Props {
	isSignUp: boolean;
	setIsSignUp: Dispatch<SetStateAction<boolean>>;
	onSubmit: SubmitHandler<FieldValues>;
	className?: string;
}

const AuthForm = ({ isSignUp, onSubmit, className, setIsSignUp }: Props) => {
	const { handleSubmit, submittedSuccessfully } = useFormContext();

	return (
		<form
			className={`flex flex-col gap-3 p-6 pt-0 ${className || ""}`}
			onSubmit={handleSubmit(onSubmit)}
			autoComplete="on"
		>
			{isSignUp && (
				<div className="flex flex-col sm:flex-row gap-3">
					<InputForm
						name="name"
						autoComplete="given-name"
						className="w-full sm:w-1/2"
						Icon={FaUser}
						type="text"
						placeholder="Nombres"
						options={{ required: true }}
					/>
					<InputForm
						name="lastName"
						autoComplete="family-name"
						className="w-full sm:w-1/2"
						type="text"
						placeholder="Apellidos"
						options={{ required: true }}
					/>
				</div>
			)}

			<InputForm
				name="email"
				autoComplete="email"
				className="w-full"
				Icon={MdEmail}
				type="email"
				placeholder="Correo"
				options={{ required: true }}
			/>

			<InputForm
				name="password"
				autoComplete={isSignUp ? "new-password" : "current-password"}
				className="w-full"
				Icon={MdLock}
				type="password"
				placeholder={isSignUp ? "Crear contraseña" : "Contraseña"}
				options={{ required: true }}
			/>

			{isSignUp && (
				<>
					<InputForm
						name="repeatPassword"
						autoComplete="new-password"
						className="w-full"
						Icon={MdLock}
						type="password"
						placeholder="Confirmar contraseña"
						options={{ required: true }}
					/>
					<SelectForm
						name="role"
						options={{ required: true }}
						values={[
							{ Paciente: "patient" },
							{ Profesional: "professional" },
							{ Administrador: "admin" },
						]}
						placeholder="¿Cuál es tu rol?"
						className="w-full"
					/>
				</>
			)}

			<button className="btn bg-rose-500 text-white w-full" type="submit">
				{isSignUp ? "Registrarse" : "Iniciar sesión"}
			</button>

			{submittedSuccessfully && (
				<SuccessfulRegistration setIsSignUp={setIsSignUp} />
			)}
		</form>
	);
};

export default AuthForm;
