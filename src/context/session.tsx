import { createContext, useContext } from "react";

export interface Profile {
	id: string;
	name: string;
	last_name: string;
	email: string;
	role: "admin" | "professional" | "patient";
	phone?: string;
	avatar?: string;
	hospital?: string;
	specialty?: string;
	services?: string[];
	bio?: string;
}

export interface SessionContextType {
	user: Profile | null;
	loading: boolean;
}

export const SessionContext = createContext<SessionContextType | undefined>(
	undefined
);

export const useSession = () => {
	const context = useContext(SessionContext);
	if (context === undefined) {
		throw new Error("useSession must be used within a SessionProvider");
	}
	return context;
};
