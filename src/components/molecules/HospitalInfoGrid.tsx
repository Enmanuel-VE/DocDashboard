interface HospitalInfoGridProps {
	address: string;
	zone?: string;
	phone: string;
	email: string;
}

export default function HospitalInfoGrid({
	address,
	zone,
	phone,
	email,
}: HospitalInfoGridProps) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
			<div>
				<span className="font-medium text-gray-500">Dirección:</span>
				<p>{address}</p>
			</div>
			<div>
				<span className="font-medium text-gray-500">Zona:</span>
				<p>{zone}</p>
			</div>
			<div>
				<span className="font-medium text-gray-500">Teléfono:</span>
				<p>{phone}</p>
			</div>
			<div>
				<span className="font-medium text-gray-500">Correo:</span>
				<p>{email}</p>
			</div>
		</div>
	);
}
