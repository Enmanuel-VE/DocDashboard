import type { UUID, Timestamp } from "./shared";

export interface HospitalProfessional {
	id: UUID;
	hospital_id?: UUID;
	profile_id?: UUID;
	role?: string;
	start_date?: string;
	created_at?: Timestamp;
}
