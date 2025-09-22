type Props = { isSignUp: boolean; className?: string };

const AuthHeader = (props: Props) => {
	return (
		<header className={"flex flex-col px-6 " + props.className}>
			<h2 className="font-semibold text-2xl text-rose-500">
				{props.isSignUp ? "Crear cuenta" : "Iniciar sesión"}
			</h2>
			<p className="text-sm text-gray-500">
				{props.isSignUp
					? "Registre sus datos para crear una cuenta nueva."
					: "Ingrese sus credenciales para acceder a su cuenta."}
			</p>
		</header>
	);
};

export default AuthHeader;
