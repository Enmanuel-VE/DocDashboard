import { useCallback } from "react";

interface Props {
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const HeroSection = (props: Props) => {
	const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
		(e) => {
			props.setSearch(e.target.value);
		},
		[props]
	);

	return (
		<section className="text-center flex flex-col gap-4">
			<h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-rose-500">
				Encuentra el hospital perfecto para ti
			</h1>
			<p className="text-gray-600 text-sm lg:text-lg max-w-2xl mx-auto">
				Descubre hospitales y profesionales médicos de confianza en tu
				área. La atención médica de calidad está a solo una búsqueda de
				distancia.
			</p>
			<div className="w-full max-w-md mx-auto">
				<input
					type="text"
					placeholder="Buscar hospitales, especialidades, o ubicaciones..."
					value={props.search}
					onChange={(e) => onChange(e)}
					className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
				/>
			</div>
		</section>
	);
};

export default HeroSection;
