import type { FieldValues } from "react-hook-form";
import supabaseClient from "../../../lib/supabaseClient";

const updateProfile = async (id: string, values: FieldValues) => {
	if (typeof values.services === "string") {
		values.services = values.services
			.split(",")
			.map((s: string) => s.trim())
			.filter((s: string) => s.length > 0);
	}

	await supabaseClient.auth.updateUser({ data: values });

	await supabaseClient
		.from("profiles")
		.update({
			name: values.name,
			last_name: values.last_name,
			phone: values.phone,
			specialty: values.specialty,
			services: values.services,
			bio: values.bio,
			avatar: values.avatar,
		})
		.eq("id", id);
};

export default updateProfile;
