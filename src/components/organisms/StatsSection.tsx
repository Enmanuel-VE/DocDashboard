import { useState, useEffect, useRef } from "react";
import supabaseClient from "../../lib/supabaseClient";
import { FaSpinner } from "react-icons/fa";

const StatsSection = () => {
	const [hospitalCount, setHospitalCount] = useState(0);
	const [doctorCount, setDoctorCount] = useState(0);
	const [loading, setLoading] = useState(true);

	const hasFetched = useRef(false);

	useEffect(() => {
		if (hasFetched.current) return;

		const fetchCounts = async () => {
			try {
				setLoading(true);

				const queries = [
					{ table: "hospitals", setter: setHospitalCount },
					{
						table: "profiles",
						setter: setDoctorCount,
						filter: { key: "role", value: "professional" },
					},
				];

				for (const { table, setter, filter } of queries) {
					let query = supabaseClient
						.from(table)
						.select("id", { head: true, count: "exact" });
					if (filter) query = query.eq(filter.key, filter.value);

					const { count, error } = await query;
					if (error) console.error(`Error contando ${table}:`, error);
					else setter(count ?? 0);
				}
			} catch (error) {
				console.error("Error al obtener estadísticas:", error);
			} finally {
				hasFetched.current = true;
				setLoading(false);
			}
		};

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
