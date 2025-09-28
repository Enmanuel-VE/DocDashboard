import type { Hospital } from "../../types/hospital";

type Props = Pick<Hospital, "address" | "zone" | "phone" | "email">;

const HospitalInfoGrid = (props: Props) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
			<div>
				<span className="font-medium text-gray-500">Dirección:</span>
				<p>{props.address}</p>
			</div>
			<div>
				<span className="font-medium text-gray-500">Zona:</span>
				<p>{props.zone}</p>
			</div>
			<div>
				<span className="font-medium text-gray-500">Teléfono:</span>
				<p>{props.phone}</p>
			</div>
			<div>
				<span className="font-medium text-gray-500">Correo:</span>
				<p>{props.email}</p>
			</div>
		</div>
	);
};

export default HospitalInfoGrid;
