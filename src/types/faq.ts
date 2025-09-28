import type { UUID, Timestamp } from "./shared";

export interface HospitalFAQ {
	id: UUID;
	hospital_id: UUID;
	question: string;
	answer: string;
	display_order?: number;
	created_at?: Timestamp;
	updated_at?: Timestamp;
}

export type PartialFAQ = Pick<HospitalFAQ, "id" | "question" | "answer">;
