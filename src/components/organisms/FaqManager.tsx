import { useForm, type SubmitHandler, FormProvider } from "react-hook-form";
import { useEffect, useState, useCallback } from "react";
import InputForm from "../atoms/InputForm";
import ButtonForm from "../atoms/ButtonForm";
import fetchFaqsByHospital from "../../utils/api/get/fetchFaqsByHospital";
import updateFaq from "../../utils/api/update/updateFaq";
import createFaq from "../../utils/api/create/createFaq";
import deleteFaq from "../../utils/api/delete/deleteFaq";

import type { Hospital } from "../../types/hospital";
import type { FAQ } from "../molecules/HospitalFaqSection";

interface FaqManagerProps {
	hospital: Hospital | null;
}

type FaqFormValues = Omit<FAQ, "id">;

const FaqManager = ({ hospital }: FaqManagerProps) => {
	const methods = useForm<FaqFormValues>();
	const { handleSubmit, reset, setValue } = methods;
	const [faqs, setFaqs] = useState<FAQ[]>([]);
	const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);

	const loadFaqs = useCallback(async () => {
		if (!hospital) return;
		const hospitalFaqs = await fetchFaqsByHospital(hospital.id);
		setFaqs(hospitalFaqs);
	}, [hospital]);

	useEffect(() => {
		loadFaqs();
	}, [loadFaqs]);

	const onSubmit: SubmitHandler<FaqFormValues> = async (data) => {
		if (!hospital) return;

		try {
			if (editingFaq) {
				await updateFaq(editingFaq.id, data);
			} else {
				await createFaq(data, hospital.id);
			}
			await loadFaqs();
			reset({ question: "", answer: "" });
			setEditingFaq(null);
		} catch (error) {
			console.error("Error al guardar la FAQ:", error);
		}
	};

	const handleEdit = (faq: FAQ) => {
		setEditingFaq(faq);
		setValue("question", faq.question);
		setValue("answer", faq.answer);
	};

	const handleDelete = async (faqId: string) => {
		if (
			window.confirm(
				"¿Estás seguro de que quieres eliminar esta pregunta?"
			)
		) {
			try {
				await deleteFaq(faqId);
				await loadFaqs();
			} catch (error) {
				console.error("Error al eliminar la FAQ:", error);
			}
		}
	};

	const cancelEdit = () => {
		setEditingFaq(null);
		reset({ question: "", answer: "" });
	};

	if (!hospital) {
		return <p>Primero debes registrar la información de tu hospital.</p>;
	}

	return (
		<div className="mt-8">
			<h2 className="text-2xl font-bold text-rose-500 mb-4">
				Gestionar Preguntas Frecuentes
			</h2>
			<FormProvider {...methods}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-4 mb-8"
				>
					<InputForm
						label="Pregunta"
						name="question"
						options={{ required: "La pregunta es obligatoria" }}
					/>
					<InputForm
						label="Respuesta"
						name="answer"
						options={{ required: "La respuesta es obligatoria" }}
						isTextArea
					/>
					<div className="flex gap-4">
						<ButtonForm type="submit" isPrimary>
							{editingFaq ? "Actualizar FAQ" : "Crear FAQ"}
						</ButtonForm>
						{editingFaq && (
							<ButtonForm onClick={cancelEdit}>
								Cancelar Edición
							</ButtonForm>
						)}
					</div>
				</form>
			</FormProvider>

			<div className="space-y-4">
				<h3 className="text-xl font-bold">FAQs Existentes</h3>
				{faqs.length > 0 ? (
					faqs.map((faq) => (
						<div
							key={faq.id}
							className="p-4 border rounded-lg shadow-sm"
						>
							<p className="font-semibold">{faq.question}</p>
							<p>{faq.answer}</p>
							<div className="flex gap-4 mt-2">
								<button
									onClick={() => handleEdit(faq)}
									className="text-blue-500 hover:underline"
								>
									Editar
								</button>
								<button
									onClick={() => handleDelete(faq.id)}
									className="text-red-500 hover:underline"
								>
									Eliminar
								</button>
							</div>
						</div>
					))
				) : (
					<p>Aún no has creado ninguna pregunta frecuente.</p>
				)}
			</div>
		</div>
	);
};

export default FaqManager;
