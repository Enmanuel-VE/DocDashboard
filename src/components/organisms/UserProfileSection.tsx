import { useNavigate } from "react-router";
import type { Profile } from "../../context/session";
import supabaseClient from "../../lib/supabaseClient";
import { useCallback, useEffect, useState, useRef } from "react";
import ProfileModal from "../atoms/ProfileModal";
import EditProfileForm from "../molecules/EditProfileForm";
import {
	useForm,
	FormProvider,
	type FieldValues,
	type SubmitHandler,
} from "react-hook-form";
import CardHospital from "../molecules/CardHospital";
import Loading from "../atoms/Loading";
import Markdown from "react-markdown";

interface Hospital {
	id: string;
	name: string;
	zone: string;
	description: string;
	rating: number;
	specialists: number;
	services: string[];
	image: string;
}

interface Props extends Profile {
	mode?: "owner" | "viewer";
}

const UserProfileSection = (props: Props) => {
	const [isLoading, setIsLoading] = useState<boolean | null>(null);
	const [profileData, setProfileData] = useState<Profile>(props);
	const [hospitals, setHospitals] = useState<Hospital[]>([]);
	const modalRef = useRef<HTMLDialogElement | null>(null);
	const navigate = useNavigate();

	const isProfessional = profileData.role === "professional";
	const isOwner = props.mode === "owner";

	const formMethods = useForm({
		defaultValues: {
			name: profileData.name ?? "",
			last_name: profileData.last_name ?? "",
			email: profileData.email ?? "",
			phone: profileData.phone ?? "",
			specialty: profileData.specialty ?? "",
			services: profileData.services ?? [],
			bio: profileData.bio ?? "",
			avatar: profileData.avatar ?? "",
		},
	});

	const handleEdit = () => {
		if (modalRef.current) modalRef.current.showModal();
	};

	const handleProfileSubmit: SubmitHandler<FieldValues> = async (values) => {
		try {
			setIsLoading(true);

			if (typeof values.services === "string") {
				values.services = values.services
					.split(",")
					.map((s: string) => s.trim())
					.filter((s: string) => s.length > 0);
			}

			await supabaseClient.auth.updateUser({ data: values });

			await supabaseClient
				.from("profiles")
				.update({
					name: values.name,
					last_name: values.last_name,
					phone: values.phone,
					specialty: values.specialty,
					services: values.services,
					bio: values.bio,
					avatar: values.avatar,
				})
				.eq("id", props.id);

			setProfileData((prev) => ({
				...prev,
				...values,
			}));
		} catch (err) {
			console.error("Error actualizando perfil:", err);
		} finally {
			setIsLoading(false);
		}
	};

	const handleLogout = useCallback(async () => {
		await supabaseClient.auth.signOut();
		navigate("/auth");
	}, [navigate]);

	useEffect(() => {
		setProfileData(props);
	}, [props]);

	useEffect(() => {
		const fetchHospitals = async () => {
			try {
				if (!isProfessional) return;

				const professionalId = profileData.id;

				const { data: rows, error } = await supabaseClient
					.from("hospital_professionals")
					.select(
						"hospitals!hospital_professionals_hospital_id_fkey(*)"
					)
					.eq("profile_id", professionalId);

				if (error) {
					console.error("Error cargando hospitales:", error);
					setHospitals([]);
				} else {
					const affHospitals: Hospital[] = rows
						.map((r) => r.hospitals)
						.flat()
						.map((h: Hospital) => ({
							id: h.id,
							name: h.name,
							zone: h.zone,
							description: h.description,
							rating: h.rating,
							specialists: h.specialists,
							services: h.services,
							image: h.image,
						}));

					setHospitals(affHospitals);
				}
			} catch (error) {
				console.error("Error cargando hospitales:", error);
			}
		};

		fetchHospitals();
	}, [isProfessional, profileData.id]);

	if (isLoading) {
		return (
			<div className="flex-1 flex flex-col h-full items-center justify-center">
				<Loading />
			</div>
		);
	}

	return (
		<section className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-6">
			<div className="flex items-center gap-6">
				<div className="avatar">
					<div className="w-24 rounded-full ring ring-rose-500 ring-offset-base-100 ring-offset-2">
						<img
							src={
								profileData.avatar ||
								`https://ui-avatars.com/api/?name=${profileData.name}&background=random`
							}
							alt={profileData.name}
						/>
					</div>
				</div>
				<div>
					<h2 className="text-2xl font-semibold text-gray-800">
						{profileData.name} {profileData.last_name}
					</h2>
					<p className="text-sm text-gray-500 capitalize">
						{isProfessional
							? "Profesional de la salud"
							: profileData.role === "admin"
							? "admin"
							: "Paciente"}
					</p>
				</div>
			</div>

			{profileData.bio && (
				<div className="flex flex-col gap-4">
					<h2 className="text-base font-semibold text-gray-600">
						Acerca de mí
					</h2>
					<div className="prose prose-sm max-w-none text-gray-700">
						<Markdown
							components={{
								p: ({ ...props }) => (
									<p
										className="mb-4 leading-relaxed text-sm text-gray-700"
										{...props}
									/>
								),
								h1: ({ ...props }) => (
									<h1
										className="text-xl font-bold text-gray-800 mt-6 mb-2 border-b pb-1"
										{...props}
									/>
								),
								h2: ({ ...props }) => (
									<h2
										className="text-lg font-semibold text-gray-800 mt-5 mb-2 border-b pb-1"
										{...props}
									/>
								),
								h3: ({ ...props }) => (
									<h3
										className="text-base font-medium text-gray-700 mt-4 mb-2"
										{...props}
									/>
								),
								ul: ({ ...props }) => (
									<ul
										className="list-disc list-inside mb-4 text-sm text-gray-700"
										{...props}
									/>
								),
								ol: ({ ...props }) => (
									<ol
										className="list-decimal list-inside mb-4 text-sm text-gray-700"
										{...props}
									/>
								),
								li: ({ ...props }) => (
									<li
										className="mb-1 text-sm text-gray-700"
										{...props}
									/>
								),
								a: ({ ...props }) => (
									<a
										className="text-sm text-rose-600 underline hover:text-rose-700 transition-colors"
										target="_blank"
										rel="noopener noreferrer"
										{...props}
									/>
								),
								code: ({ ...props }) => (
									<code
										className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono text-gray-800"
										{...props}
									/>
								),
								blockquote: ({ ...props }) => (
									<blockquote
										className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4"
										{...props}
									/>
								),
							}}
						>
							{profileData.bio}
						</Markdown>
					</div>
				</div>
			)}

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
				<div>
					<span className="font-medium text-gray-500">Correo:</span>
					<p>{profileData.email}</p>
				</div>
				{profileData.phone && (
					<div>
						<span className="font-medium text-gray-500">
							Teléfono:
						</span>
						<p>{profileData.phone}</p>
					</div>
				)}
				{profileData.hospital && isProfessional && (
					<div>
						<span className="font-medium text-gray-500">
							Hospital:
						</span>
						<p>{profileData.hospital}</p>
					</div>
				)}
				{profileData.specialty && isProfessional && (
					<div>
						<span className="font-medium text-gray-500">
							Especialidad:
						</span>
						<p>{profileData.specialty}</p>
					</div>
				)}
			</div>

			{isProfessional &&
			Array.isArray(profileData.services) &&
			profileData.services.length > 0 ? (
				<div className="flex flex-wrap gap-2">
					{profileData.services.map((service) => (
						<span
							key={crypto.randomUUID()}
							className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
						>
							{service}
						</span>
					))}
				</div>
			) : (
				isProfessional && (
					<p className="text-xs text-gray-400">
						No se han especificado servicios.
					</p>
				)
			)}

			{isOwner && (
				<div className="pt-4 flex gap-2">
					<button
						onClick={handleLogout}
						className="btn text-sm text-white bg-rose-500"
					>
						Cerrar sesión
					</button>
					<button
						className="btn text-sm text-white bg-rose-500"
						type="button"
						onClick={handleEdit}
					>
						Editar perfil
					</button>
				</div>
			)}

			<ProfileModal modalId="edit_profile_modal" ref={modalRef}>
				<h3 className="font-bold text-lg mb-4">Editar perfil</h3>
				<FormProvider {...formMethods}>
					<EditProfileForm
						isProfessional={isProfessional}
						onSubmit={handleProfileSubmit}
					/>
				</FormProvider>
			</ProfileModal>

			{isProfessional && hospitals.length > 0 && (
				<div className="pt-6">
					<h3 className="text-lg font-semibold text-gray-800 mb-2">
						Hospitales asociados
					</h3>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{hospitals.map((h) => (
							<CardHospital key={h.id} {...h} />
						))}
					</div>
				</div>
			)}
		</section>
	);
};

export default UserProfileSection;
