import Loading from "../components/atoms/Loading";
import AdminDashboard from "../components/pages/AdminDashboard";
import Dashboard from "../components/pages/Dashboard";
import { useSession } from "../context/session";

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
