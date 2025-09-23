import "./styles/globals.css";

import { RouterProvider } from "react-router";
import { router } from "./routes/AppRoutes";
import { SessionProvider } from "./context/SessionContext";
import AuxRedirect from "./components/utils/AuxRedirect";

function App() {
	return (
		<SessionProvider>
			<AuxRedirect />
			<RouterProvider router={router} />
		</SessionProvider>
	);
}

export default App;
