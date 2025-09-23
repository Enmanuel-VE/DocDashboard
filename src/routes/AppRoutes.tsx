import MainLayout from "../components/templates/MainLayout";
import SearchPage from "../components/pages/SearchPage";
import HospitalPage from "../components/pages/HospitalPage";
import ProfessionalProfile from "../components/pages/ProfessionalProfile";
import MyAccount from "../components/pages/MyAccount";
import Auth from "../components/pages/Auth";
import NotFound from "../components/pages/NotFound";
import {
	createBrowserRouter,
	type DOMRouterOpts,
	type RouteObject,
} from "react-router";
import RoleDashboard from "../components/utils/RoleDashboard";

export const routes: RouteObject[] = [
	{
		path: "/",
		element: <MainLayout />,
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
				element: <ProfessionalProfile />,
			},
			{
				path: "hospital/:hospitalId",
				element: <HospitalPage />,
			},
			{ path: "account", element: <MyAccount /> },
			{ path: "*", element: <NotFound /> },
		],
	},
	{ path: "auth", element: <Auth /> },
	{ path: "*", element: <NotFound /> },
];

const options: DOMRouterOpts = {
	basename: "/DocDashboard",
};

export const router = createBrowserRouter(routes, options);
