import type { FieldValues, SubmitHandler } from "react-hook-form";
import AuthToggle from "../molecules/AuthToggle";
import AuthHeader from "../molecules/AuthHeader";
import AuthForm from "../molecules/AuthForm";
import type { Dispatch, SetStateAction } from "react";

interface AuthSectionProps {
	isSignUp: boolean;
	setIsSignUp: Dispatch<SetStateAction<boolean>>;
	onSubmit: SubmitHandler<FieldValues>;
}

const AuthSection = (props: AuthSectionProps) => {
	return (
		<section className="flex flex-col min-h-[65dvh] w-full gap-6 border border-[#dce0e5] bg-white max-w-md rounded-lg shadow-md mx-auto">
			<AuthToggle
				isSignUp={props.isSignUp}
				setIsSignUp={props.setIsSignUp}
			/>
			<div className="flex flex-col gap-6 flex-1">
				<AuthHeader className="flex-1/2" isSignUp={props.isSignUp} />
				<AuthForm
					className="flex-1/2"
					setIsSignUp={props.setIsSignUp}
					isSignUp={props.isSignUp}
					onSubmit={props.onSubmit}
				/>
			</div>
		</section>
	);
};

export default AuthSection;
