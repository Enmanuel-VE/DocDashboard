import {
	FormProvider,
	useForm,
	type FieldValues,
	type SubmitHandler,
} from "react-hook-form";
import HospitalForm from "../molecules/HospitalForm";
import supabaseClient from "../../lib/supabaseClient";
import type { HospitalDetail } from "../organisms/HospitalTabsSection";
import { useSession } from "../../context/session";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
	const methods = useForm();

	const { user } = useSession();
	const [hospital, setHospital] = useState<HospitalDetail | null>(null);

	useEffect(() => {
		if (!user) return;
		if (user.role !== "admin") return;

		const fetchData = async () => {
			try {
				const { data: existingHospital, error: fetchError } =
					await supabaseClient
						.from("hospitals")
						.select("*")
						.eq("admin_id", user.id)
						.maybeSingle();

				if (fetchError && fetchError.code !== "PGRST116") {
					throw new Error("Error al verificar hospital existente");
				}

				if (existingHospital) {
					methods.reset(existingHospital);
				}

				setHospital(existingHospital);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [user, methods]);

	const onSubmit: SubmitHandler<FieldValues | HospitalDetail> = async (h) => {
		try {
			if (!user) return;
			if (user.role !== "admin") return;

			let formatServices: string[] = [];

			if (typeof h.services === "string") {
				formatServices = h.services
					.split(",")
					.map((s) => s.trim())
					.filter(Boolean);
			}

			if (hospital) {
				const { error } = await supabaseClient
					.from("hospitals")
					.update([
						{
							name: h.name,
							description: h.description,
							address: h.address,
							zone: h.zone,
							phone: h.phone,
							email: h.email,
							image: h.image,
							services: formatServices,
							admin_id: user.id,
						},
					])
					.eq("id", hospital.id);

				if (error) throw new Error("No se pudo actualizar el hospital");
			} else if (!hospital) {
				const { error } = await supabaseClient
					.from("hospitals")
					.insert([
						{
							name: h.name,
							description: h.description,
							address: h.address,
							zone: h.zone,
							phone: h.phone,
							email: h.email,
							image: h.image,
							services: formatServices,
							admin_id: user.id,
						},
					]);

				if (error) throw new Error("No se pudo crear el hospital");
			}
		} catch (error) {
			console.error("Error submitting hospital data:", error);
		}
	};

	const handleDelete = async () => {
		if (!hospital) return;

		try {
			const { error } = await supabaseClient
				.from("hospitals")
				.delete()
				.eq("id", hospital.id);

			if (error) throw new Error("No se pudo eliminar el hospital");
			setHospital(null);
			methods.reset({});
		} catch (error) {
			console.error("Error eliminando hospital:", error);
		}
	};

	return (
		<div className="flex-1 flex flex-col justify-center items-center">
			<div className="flex flex-col gap-6 max-w-6xl p-4">
				<header className="flex flex-col w-full items-center">
					<h1 className="text-3xl font-bold text-rose-500">
						Panel del hospital
					</h1>
					<p>
						Gestiona la información del hospital desde este panel.
					</p>
				</header>

				<FormProvider {...methods}>
					<HospitalForm
						handleDelete={handleDelete}
						hospital={hospital}
						onSubmit={onSubmit}
					/>
				</FormProvider>
			</div>
		</div>
	);
};

export default AdminDashboard;
