import { useEffect } from "react";

import { handleGitHubPagesRedirect } from "./handleGitHubPagesRedirect";
import { useSession } from "../context/session";
import { router } from "../routes/AppRoutes";

const GitHubPagesRedirect = () => {
	const { loading } = useSession();

	useEffect(() => {
		if (!loading) {
			handleGitHubPagesRedirect(router.navigate);
		}
	}, [loading]);

	return null;
};

export default GitHubPagesRedirect;
