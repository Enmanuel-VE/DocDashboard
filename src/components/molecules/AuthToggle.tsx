import { useFormContext } from "react-hook-form";
import AuthButton from "../atoms/AuthButton";
import type { Dispatch, SetStateAction } from "react";

interface Props {
	isSignUp: boolean;
	setIsSignUp: Dispatch<SetStateAction<boolean>>;
}

const AuthToggle = ({ isSignUp, setIsSignUp }: Props) => {
	const { reset } = useFormContext();

	const toggleAuth = (value: boolean) => {
		setIsSignUp(value);
		reset();
	};

	return (
		<nav className="flex flex-row rounded-md p-1 bg-[#F4F5F6]">
			<AuthButton onClick={() => toggleAuth(false)} active={!isSignUp}>
				Iniciar sesion
			</AuthButton>
			<AuthButton onClick={() => toggleAuth(true)} active={isSignUp}>
				Registrarce
			</AuthButton>
		</nav>
	);
};

export default AuthToggle;
