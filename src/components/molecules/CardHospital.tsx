import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import supabaseClient from "../../lib/supabaseClient";
import { useSession } from "../../context/session";
import ButtonForm from "../atoms/ButtonForm";
import { FaGear } from "react-icons/fa6";

type Props = {
	id: string;
	name: string;
	zone: string;
	description: string;
	rating: number;
	specialists: number;
	services: string[];
	image: string;
};

const MAX_PILLS = 3;

function truncateText(text: string, maxLength: number): string {
	const isLongerThanMaxLength = text.length > maxLength;
	const newText = text.slice(0, maxLength).trim() + "...";

	return isLongerThanMaxLength ? newText : text;
}

const CardHospital = (props: Props) => {
	const navigate = useNavigate();
	const [liked, setLiked] = useState(false);
	const [isOwnHospital, setIsOwnHospital] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const { user } = useSession();
	const hasFetched = useRef(false);

	useEffect(() => {
		if (!user || hasFetched.current) return;

		const checkStatus = async () => {
			if (user.role === "admin") {
				const { data: hospital, error } = await supabaseClient
					.from("hospitals")
					.select("id")
					.eq("id", props.id)
					.eq("admin_id", user.id)
					.limit(1)
					.maybeSingle();

				if (error) {
					console.error(
						"Error al verificar propiedad del hospital:",
						error
					);
				}

				setIsOwnHospital(!!hospital);
			}

			const { data, error: likeError } = await supabaseClient
				.from("hospital_likes")
				.select("id")
				.eq("user_id", user.id)
				.eq("hospital_id", props.id)
				.limit(1)
				.maybeSingle();

			if (likeError) {
				console.error("Error al verificar like:", likeError);
				return;
			}
			setIsLoading(false);
			setLiked(!!data);
			hasFetched.current = true;
		};

		checkStatus();
	}, [props.id, user]);

	const toggleLike = async () => {
		if (!user) return;

		if (liked) {
			const { error } = await supabaseClient
				.from("hospital_likes")
				.delete()
				.eq("user_id", user.id)
				.eq("hospital_id", props.id);

			if (error) {
				console.error("Error al quitar like:", error);
			} else {
				setLiked(false);
			}
		} else {
			const { error } = await supabaseClient
				.from("hospital_likes")
				.insert({
					user_id: user.id,
					hospital_id: props.id,
				});

			if (error) {
				console.error("Error al agregar like:", error);
			} else {
				setLiked(true);
			}
		}
	};

	return (
		<div className="transform hover:scale-95 hover:transition-transform duration-300 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition flex flex-col">
			{props.image && (
				<img
					src={props.image}
					alt={props.name}
					className="w-full h-40 object-cover"
				/>
			)}

			<div className="p-4 flex flex-col gap-2 flex-grow">
				<div className="flex flex-row justify-between gap-2 items-center">
					<Link
						to={`/hospital/${props.id}`}
						title={props.name}
						className="text-md cursor-pointer font-semibold text-gray-800"
					>
						{truncateText(props.name, 35)}
					</Link>

					{isOwnHospital && (
						<span className="text-xs text-rose-500 font-semibold bg-rose-50 px-2 py-1 rounded-md">
							Tu hospital
						</span>
					)}
				</div>

				<p className="text-sm text-gray-500">{props.zone}</p>
				<p className="text-sm text-gray-600">
					{truncateText(props.description, 100)}
				</p>

				<div className="flex flex-wrap gap-2 mt-2">
					{props.services
						.slice(0, MAX_PILLS)
						.map((service, index) => (
							<span
								key={index}
								className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
							>
								{service}
							</span>
						))}

					{props.services.length > MAX_PILLS && (
						<span className="text-xs text-gray-500">
							+{props.services.length - MAX_PILLS} más
						</span>
					)}
				</div>

				<div className="flex-1 flex flex-col justify-end">
					<p className="text-sm text-gray-500">
						{props.specialists} especialistas disponibles
					</p>
				</div>

				<div className="flex flex-row gap-3 mt-auto pt-2">
					<ButtonForm
						className=" flex-1 btn rounded-md bg-rose-500 text-white"
						onClick={() => navigate(`/hospital/${props.id}`)}
					>
						{isOwnHospital ? "Previsualización" : "Ver hospital"}
					</ButtonForm>

					{!isOwnHospital ? (
						<button
							onClick={toggleLike}
							className={`rounded-md cursor-pointer px-4 bg-[#F3F4F6] flex items-center justify-center ${
								liked ? "text-gray-600" : "text-rose-500"
							}`}
							type="button"
							disabled={isLoading}
						>
							{isLoading ? (
								<span className="animate-spin w-4 h-4 border-2 border-t-transparent border-rose-500 rounded-full" />
							) : liked ? (
								<FaHeartBroken />
							) : (
								<FaHeart />
							)}
						</button>
					) : null}

					{isOwnHospital ? (
						<Link to="/">
							<button className="h-full rounded-md cursor-pointer px-4 bg-[#F3F4F6] flex flex-col items-center justify-center">
								<FaGear />
							</button>
						</Link>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
};

export default CardHospital;
