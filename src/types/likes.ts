import type { UUID, Timestamp } from "./shared";

export interface HospitalLike {
	id: UUID;
	user_id?: UUID;
	hospital_id?: UUID;
	created_at?: Timestamp;
}

export interface ProfessionalLike {
	id: UUID;
	user_id?: UUID;
	professional_id?: UUID;
	created_at?: Timestamp;
}
