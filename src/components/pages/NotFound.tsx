import { Link } from "react-router";

const NotFound = () => {
	return (
		<>
			<div className="flex-1 flex flex-col items-center justify-center bg-gray-50 px-4">
				<h1 className="text-7xl font-extrabold text-rose-500 mb-4">
					404
				</h1>
				<h2 className="text-2xl font-bold text-gray-800 mb-2">
					¡Ups! Parece ser que estas en territorio desconocido.
				</h2>
				<p className="text-gray-600 mb-6 text-center max-w-md">
					La página que buscas no existe o ha sido movida.
				</p>
				<Link
					to="/"
					className="px-6 py-2 rounded-full bg-rose-500 text-white font-semibold shadow hover:bg-rose-600 transition"
				>
					Volver al inicio
				</Link>
			</div>
		</>
	);
};

export default NotFound;
