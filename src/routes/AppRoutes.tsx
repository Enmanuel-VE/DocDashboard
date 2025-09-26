import ProfessionalProfile from "../components/pages/ProfessionalProfile";
import RoleDashboard from "../components/utils/RoleDashboard";
import MainLayout from "../components/templates/MainLayout";
import HospitalPage from "../components/pages/HospitalPage";
import SearchPage from "../components/pages/SearchPage";
import MyAccount from "../components/pages/MyAccount";
import NotFound from "../components/pages/NotFound";
import Auth from "../components/pages/Auth";

import ProfessionalProfileRoute from "./guards/ProfessionalProfileRoute";
import ProtectedRoute from "./guards/ProtectedRoute";
import PublicRoute from "./guards/PublicRoute";

import type { RouteObject, DOMRouterOpts } from "react-router";
import { createBrowserRouter } from "react-router";

export const routes: RouteObject[] = [
	{
		path: "/",
		element: (
			<ProtectedRoute>
				<MainLayout />
			</ProtectedRoute>
		),
		children: [
			{ index: true, element: <RoleDashboard /> },
			{ path: "search", element: <SearchPage /> },
			{ path: "hospital", element: <HospitalPage /> },
			{
				path: "hospital/:hospitalId/professional/:professionalId",
				element: <ProfessionalProfile />,
			},
			{
				path: "professional/:professionalId",
				element: (
					<ProfessionalProfileRoute>
						<ProfessionalProfile />
					</ProfessionalProfileRoute>
				),
			},
			{
				path: "hospital/:hospitalId",
				element: <HospitalPage />,
			},
			{ path: "account", element: <MyAccount /> },
			{ path: "*", element: <NotFound /> },
		],
	},
	{
		path: "auth",
		element: (
			<PublicRoute>
				<Auth />
			</PublicRoute>
		),
	},
	{ path: "*", element: <NotFound /> },
];

const options: DOMRouterOpts = {
	basename: "/DocDashboard/",
};

export const router = createBrowserRouter(routes, options);
