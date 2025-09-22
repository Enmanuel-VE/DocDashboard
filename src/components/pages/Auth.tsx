import type { FieldValues, SubmitHandler } from "react-hook-form";
import type {
	SignInWithPasswordCredentials,
	SignUpWithPasswordCredentials,
} from "@supabase/supabase-js";

import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";

import AuthSection from "../organisms/AuthSection";
import AuthTemplate from "../templates/AuthTemplate";

import supabaseClient from "../../lib/supabaseClient";

const Auth = () => {
	const [isSignUp, setIsSignUp] = useState<boolean>(false);
	const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
	const methods = useForm();

	const customFormContext = {
		...methods,
		submittedSuccessfully,
	};

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		if (isSignUp) {
			const credentials: SignUpWithPasswordCredentials = {
				email: data.email,
				password: data.password,
				options: {
					data: {
						name: data.name,
						lastName: data.lastName,
						role: data.role,
					},
				},
			};
			await supabaseClient.auth.signUp(credentials);
			setSubmittedSuccessfully(true);
		} else {
			const credentials: SignInWithPasswordCredentials = {
				email: data.email,
				password: data.password,
			};
			await supabaseClient.auth.signInWithPassword(credentials);
		}
	};

	return (
		<AuthTemplate>
			<FormProvider {...customFormContext}>
				<AuthSection
					isSignUp={isSignUp}
					setIsSignUp={setIsSignUp}
					onSubmit={onSubmit}
				/>
			</FormProvider>
		</AuthTemplate>
	);
};

export default Auth;
