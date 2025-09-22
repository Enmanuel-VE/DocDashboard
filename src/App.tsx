import "./styles/globals.css";

import { RouterProvider } from "react-router";
import { router } from "./routes/AppRoutes";
import { SessionProvider } from "./context/SessionContext";
import SessionRedirect from "./components/utils/SessionRedirect";

function App() {
	return (
		<SessionProvider>
			<SessionRedirect />
			<RouterProvider router={router} />
		</SessionProvider>
	);
}

export default App;
