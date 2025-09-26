import Loading from "../../components/atoms/Loading";
import { useSession } from "../../context/session";
import { Navigate } from "react-router";

interface Props {
	children: React.ReactNode;
}

const ProtectedRoute = (props: Props) => {
	const { user, loading } = useSession();

	if (loading)
		return (
			<div className="flex flex-col h-screen justify-center">
				<Loading />
			</div>
		);

	if (!user) return <Navigate to="/auth" replace />;

	return <>{props.children}</>;
};

export default ProtectedRoute;
