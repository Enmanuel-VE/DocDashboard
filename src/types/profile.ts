import type { UUID, Timestamp, Role } from "./shared";

export interface Profile {
	id: UUID;
	name: string;
	last_name: string;
	role: Role;
	created_at: Timestamp;
	phone?: string;
	avatar?: string;
	hospital?: string;
	specialty?: string;
	services?: string[];
	bio?: string;
	email?: string;
}

export type Doctor = Pick<
	Profile,
	"id" | "name" | "last_name" | "specialty" | "avatar" | "hospital"
>;

/*
Users supabase
UID
Display Name
Email
Phone
Providers
Provider type
Create at
Last sign in at
*/
