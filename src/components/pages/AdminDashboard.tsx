import { FormProvider, useForm } from "react-hook-form";
import HospitalForm from "../molecules/HospitalForm";

import { useSession } from "../../context/session";
import { useCallback, useEffect, useRef, useState } from "react";
import HospitalPage from "./HospitalPage";
import FaqManager from "../organisms/FaqManager";

import fetchHospitalByAdmin from "../../utils/api/get/fetchHospitalByAdmin";
import updateHospital from "../../utils/api/update/updateHospital";
import createHospital from "../../utils/api/create/createHospital";
import deleteHospital from "../../utils/api/delete/deleteHospital";

import type { FieldValues, SubmitHandler } from "react-hook-form";
import type { Hospital } from "../../types/hospital";

type HospitalPayload = Omit<Hospital, "id">;

const AdminDashboard = () => {
	const methods = useForm<HospitalPayload>();
	const { user } = useSession();
	const [hospital, setHospital] = useState<Hospital | null>(null);

	const hasFetched = useRef<Record<string, boolean>>({});

	const loadHospital = useCallback(async () => {
		if (!user || user.role !== "admin") return;

		const existingHospital = await fetchHospitalByAdmin(user.id);
		if (existingHospital) {
			methods.reset(existingHospital);
		}
		setHospital(existingHospital);
		hasFetched.current[user.id] = true;
	}, [user, methods]);

	useEffect(() => {
		if (!user || user.role !== "admin" || hasFetched.current[user.id])
			return;
		loadHospital();
	}, [user, loadHospital]);

	const onSubmit: SubmitHandler<Hospital | FieldValues> = async (h) => {
		if (!user || user.role !== "admin") return;

		const formatServices =
			typeof h.services === "string"
				? h.services
						.split(",")
						.map((s) => s.trim())
						.filter(Boolean)
				: h.services;

		const payload: HospitalPayload = {
			name: h.name,
			description: h.description,
			address: h.address,
			zone: h.zone,
			phone: h.phone,
			email: h.email,
			image: h.image,
			services: formatServices,
			specialists: h.specialists,
		};

		try {
			if (hospital) {
				await updateHospital(
					{ ...payload, id: hospital.id },
					hospital.id,
					user.id
				);
			} else {
				await createHospital(payload, user.id);
			}
			await loadHospital();
		} catch (error) {
			console.error("Error al guardar hospital:", error);
		}
	};

	const handleDelete = async () => {
		if (!hospital) return;

		try {
			await deleteHospital(hospital.id);
			setHospital(null);
			methods.reset({});
		} catch (error) {
			console.error("Error eliminando hospital:", error);
		}
	};

	return (
		<div className="flex-1 flex flex-col w-full justify-center items-center">
			<div className="grid grid-cols-1 xl:grid-cols-2 p-4 gap-3 w-full">
				<div className="flex flex-col p-4 gap-3">
					<header className="flex flex-col w-full items-center">
						<h1 className="text-3xl font-bold text-rose-500">
							Panel del hospital
						</h1>
						<p>
							Gestiona la información del hospital desde este
							panel.
						</p>
					</header>
					<FormProvider {...methods}>
						<HospitalForm
							handleDelete={handleDelete}
							hospital={hospital}
							onSubmit={onSubmit}
						/>
					</FormProvider>
					<FaqManager hospital={hospital} />
				</div>
				<div className="flex flex-col p-4 gap-3">
					<HospitalPage hospital={hospital} />
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
