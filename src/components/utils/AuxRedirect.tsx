import { useSession } from "../../context/session";
import { useEffect } from "react";
import { router } from "../../routes/AppRoutes";
import { handleGitHubPagesRedirect } from "./handleGitHubPagesRedirect";

const AuxRedirect = () => {
	const { user, loading } = useSession();

	useEffect(() => {
		if (loading) return;

		const isRedirected = handleGitHubPagesRedirect(router.navigate);

		if (isRedirected) {
			return;
		}

		const currentPath = window.location.pathname;
		const isAuthPath = currentPath === "/auth";

		if (!user) {
			router.navigate("/auth");
			return;
		}

		if (!user && !isAuthPath) {
			router.navigate("/auth");
			return;
		}

		if (user && isAuthPath) {
			router.navigate("/");
			return;
		}

		if (user.role === "professional") {
			const isOwnProfessionalProfile = currentPath.includes(
				`/professional/${user.id}`
			);

			if (isOwnProfessionalProfile) {
				router.navigate("/account");
				return;
			}
		}
	}, [user, loading]);

	return null;
};

export default AuxRedirect;
