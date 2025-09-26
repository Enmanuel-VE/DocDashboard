import Loading from "../../components/atoms/Loading";
import { useSession } from "../../context/session";
import { Navigate, useParams } from "react-router";

interface Props {
	children: React.ReactNode;
}

const ProfessionalProfileRoute = (props: Props) => {
	const { user, loading } = useSession();
	const { professionalId } = useParams();

	if (loading)
		return (
			<div className="flex flex-col h-screen justify-center">
				<Loading />
			</div>
		);

	if (!user) return <Navigate to="/auth" replace />;

	if (user.role === "professional" && user.id === professionalId) {
		return <Navigate to="/account" replace />;
	}

	return <>{props.children}</>;
};

export default ProfessionalProfileRoute;
