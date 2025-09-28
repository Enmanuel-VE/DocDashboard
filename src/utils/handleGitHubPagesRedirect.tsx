import type { NavigateFunction } from "react-router";

export const handleGitHubPagesRedirect = (navigate: NavigateFunction) => {
	const params = new URLSearchParams(window.location.search);
	const redirectPath = params.get("p");

	if (redirectPath) {
		navigate(redirectPath, { replace: true });
	}

	return;
};
