import "./styles/globals.css";

import { RouterProvider } from "react-router";
import { router } from "./routes/AppRoutes";
import { SessionProvider } from "./context/SessionContext";
import GitHubPagesRedirect from "./components/utils/GitHubPagesRedirect";

const App = () => {
	return (
		<SessionProvider>
			<GitHubPagesRedirect />
			<RouterProvider router={router} />
		</SessionProvider>
	);
};

export default App;
