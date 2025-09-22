import { FaSpinner } from "react-icons/fa";

interface Props {
	className?: string;
	message?: string;
}

const Loading = (props: Props) => {
	return (
		<div
			className={`flex flex-col gap-4 justify-center items-center text-center text-gray-500 ${props.className}`}
		>
			<FaSpinner className="w-8 h-8 animate-spin text-rose-500" />
			<h3 className="text-lg font-semibold">
				{props.message || "Cargando..."}
			</h3>
		</div>
	);
};
export default Loading;
