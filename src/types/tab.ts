export const tabs = [
	"Sobre el hospital",
	"Profesionales",
	"Preguntas frecuentes",
] as const;

export type Tab = (typeof tabs)[number];
