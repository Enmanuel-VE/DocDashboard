import { useState, useEffect } from "react";
import supabaseClient from "../../lib/supabaseClient";
import { FaSpinner } from "react-icons/fa";

const StatsSection = () => {
	const [hospitalCount, setHospitalCount] = useState(0);
	const [doctorCount, setDoctorCount] = useState(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchCounts() {
			setLoading(true);

			const { count: hCount, error: hError } = await supabaseClient
				.from("hospitals")
				.select("id", { head: true, count: "exact" });

			if (hError) console.error("Error contando hospitales:", hError);
			else setHospitalCount(hCount ?? 0);

			const { count: dCount, error: dError } = await supabaseClient
				.from("profiles")
				.select("id", { head: true, count: "exact" })
				.eq("role", "professional");

			if (dError) console.error("Error contando profesionales:", dError);
			else setDoctorCount(dCount ?? 0);

			setLoading(false);
		}

		fetchCounts();
	}, []);

	if (loading) {
		return (
			<div className="flex flex-col gap-6 md:flex-row">
				<div className="flex-1 flex flex-row justify-between bg-white p-6 rounded-xl shadow">
					<h3 className="text-xl font-semibold">
						Hospitales totales
					</h3>
					<p className="text-xl">
						<FaSpinner className="animate-spin" />
					</p>
				</div>
				<div className="flex-1 flex flex-row justify-between bg-white p-6 rounded-xl shadow">
					<h3 className="text-xl font-semibold">Doctores totales</h3>
					<p className="text-xl ">
						<FaSpinner className="animate-spin" />
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6 md:flex-row">
			<div className="flex-1 flex flex-row justify-between bg-white p-6 rounded-xl shadow">
				<h3 className="text-xl font-semibold">Hospitales totales</h3>
				<p className="text-xl">{hospitalCount}</p>
			</div>
			<div className="flex-1 flex flex-row justify-between bg-white p-6 rounded-xl shadow">
				<h3 className="text-xl font-semibold">Doctores totales</h3>
				<p className="text-xl">{doctorCount}</p>
			</div>
		</div>
	);
};

export default StatsSection;
