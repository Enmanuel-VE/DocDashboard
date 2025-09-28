import type { UUID, Timestamp } from "./shared";

export interface Hospital {
	id: UUID;
	name: string;
	description?: string;
	address?: string;
	zone?: string;
	phone?: string;
	email?: string;
	image?: string;
	specialists?: number;
	services?: string[];
	created_at?: Timestamp;
	admin_id?: UUID;
}
