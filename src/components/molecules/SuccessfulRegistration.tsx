import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

interface Props {
	setIsSignUp: Dispatch<SetStateAction<boolean>>;
}

const SuccessfulRegistration = (props: Props) => {
	const [count, setCount] = useState<number>(10);

	useEffect(() => {
		if (count === 0) {
			props.setIsSignUp(false);
			return;
		}

		const timer = setTimeout(() => {
			setCount((prev) => prev - 1);
		}, 1000);

		return () => clearTimeout(timer);
	}, [count, props]);

	if (count > 0) {
		return (
			<div className="flex flex-col bg-green-50 p-4 rounded-md text-green-700 text-sm">
				<p>✅ Registro exitoso. Revisa tu correo para confirmar.</p>
				<p>
					En <span className="font-bold">{count}</span> segundos se
					redirigirá al inicio de sesión.
				</p>
			</div>
		);
	} else {
		return <></>;
	}
};

export default SuccessfulRegistration;
