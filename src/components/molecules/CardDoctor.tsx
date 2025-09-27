import { useState, useEffect, useCallback, useRef } from "react";
import { FaHeart, FaHeartBroken, FaLink } from "react-icons/fa";
import { FaLinkSlash } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router";
import supabaseClient from "../../lib/supabaseClient";
import { useSession } from "../../context/session";

type Props = {
	id: string;
	name: string;
	specialty: string;
	hospital: string;
	image: string;
};

function CardDoctor(props: Props) {
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useSession();

	const [liked, setLiked] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const hasFetched = useRef(false);

	useEffect(() => {
		if (!user || !props.id || hasFetched.current) {
			setIsLoading(false);
			return;
		}

		const checkStatus = async () => {
			try {
				setIsLoading(true);

				if (user.role === "admin") {
					const { data: hospital } = await supabaseClient
						.from("hospitals")
						.select("id")
						.eq("admin_id", user.id)
						.single();

					if (!hospital) return;

					const { data: existing } = await supabaseClient
						.from("hospital_professionals")
						.select("id")
						.eq("hospital_id", hospital.id)
						.eq("profile_id", props.id);

					setLiked(!!existing?.length);
				} else {
					const { data } = await supabaseClient
						.from("professional_likes")
						.select("id")
						.eq("user_id", user.id)
						.eq("professional_id", props.id)
						.limit(1)
						.maybeSingle();

					setLiked(!!data);
				}
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
				hasFetched.current = true;
			}
		};

		checkStatus();
	}, [user, props.id]);

	const toggleLike = useCallback(async () => {
		if (!user || !props.id) return;

		if (liked) {
			const { error } = await supabaseClient
				.from("professional_likes")
				.delete()
				.eq("user_id", user.id)
				.eq("professional_id", props.id);

			if (error) {
				console.error("Error al quitar like:", error);
			} else {
				setLiked(false);
			}
		} else {
			const { error } = await supabaseClient
				.from("professional_likes")
				.insert({ user_id: user.id, professional_id: props.id });

			if (error?.code === "23505") {
				setLiked(true);
			} else if (error) {
				console.error("Error al agregar like:", error);
			} else {
				setLiked(true);
			}
		}
	}, [user, props.id, liked]);

	const handleLinkHospital = useCallback(async () => {
		if (!user || user.role !== "admin") return;

		const { data: hospital } = await supabaseClient
			.from("hospitals")
			.select("id")
			.eq("admin_id", user.id)
			.single();

		if (!hospital) {
			console.error("No se encontró el hospital del admin");
			return;
		}

		if (liked) {
			const { error } = await supabaseClient
				.from("hospital_professionals")
				.delete()
				.eq("hospital_id", hospital.id)
				.eq("profile_id", props.id);

			if (error) {
				console.error("Error al desvincular profesional:", error);
			} else {
				setLiked(false);
			}
		} else {
			const { error } = await supabaseClient
				.from("hospital_professionals")
				.insert([
					{
						hospital_id: hospital.id,
						profile_id: props.id,
						role: "professional",
					},
				]);

			if (error?.code === "23505") {
				setLiked(true);
			} else if (error) {
				console.error("Error al vincular profesional:", error);
			} else {
				setLiked(true);
			}
		}
	}, [user, props.id, liked]);

	return (
		<div className="transform hover:scale-95 bg-white rounded-xl shadow-md p-4 flex flex-col items-center gap-4 hover:shadow-xl transition">
			<div className="avatar">
				<div className="w-24 rounded-full">
					<img
						src={
							props.image ||
							`https://ui-avatars.com/api/?name=${props.name}&background=random`
						}
						alt={props.name}
					/>
				</div>
			</div>

			<div className="text-center flex flex-col gap-1">
				<h3 className="text-lg font-semibold text-gray-800">
					{props.name}
				</h3>
				<p className="text-sm text-gray-500">{props.specialty}</p>
				<p className="text-sm text-gray-400">{props.hospital}</p>
			</div>

			<div className="flex flex-row gap-3">
				<button
					className="btn text-sm text-white bg-rose-500"
					onClick={() => {
						const hospitalMatch = location.pathname.match(
							/^\/hospital\/([^/]+)$/
						);
						const hospitalId = hospitalMatch?.[1];
						navigate(
							hospitalId
								? `/hospital/${hospitalId}/professional/${props.id}`
								: `/professional/${props.id}`
						);
					}}
				>
					Ver perfil
				</button>

				<button
					onClick={
						user?.role === "admin" ? handleLinkHospital : toggleLike
					}
					className={`rounded-md cursor-pointer px-4 bg-[#F3F4F6] flex items-center justify-center ${
						liked ? "text-gray-600" : "text-rose-500"
					}`}
					type="button"
					disabled={isLoading}
				>
					{isLoading ? (
						<span className="animate-spin w-4 h-4 border-2 border-t-transparent border-rose-500 rounded-full" />
					) : user?.role === "admin" ? (
						liked ? (
							<FaLinkSlash />
						) : (
							<FaLink />
						)
					) : liked ? (
						<FaHeartBroken />
					) : (
						<FaHeart />
					)}
				</button>
			</div>
		</div>
	);
}

export default CardDoctor;
