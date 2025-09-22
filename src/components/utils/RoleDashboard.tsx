import { useSession } from "../../context/session";
import Loading from "../atoms/Loading";
import AdminDashboard from "../pages/AdminDashBoard";
import Dashboard from "../pages/Dashboard";

const RoleDashboard = () => {
	const { user, loading } = useSession();

	if (loading)
		return (
			<div className="flex flex-col flex-1 h-full w-full justify-center items-center">
				<Loading />
			</div>
		);
	if (!user) return <Dashboard />;

	return user.role === "admin" ? <AdminDashboard /> : <Dashboard />;
};

export default RoleDashboard;
