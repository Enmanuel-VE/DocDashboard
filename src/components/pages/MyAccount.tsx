import { useSession } from "../../context/session";
import Loading from "../atoms/Loading";
import UserProfileSection from "../organisms/UserProfileSection";

const MyAccount = () => {
	const { user, loading } = useSession();

	if (loading)
		return (
			<div className="flex-1 h-full w-full flex items-center justify-center">
				<Loading />
			</div>
		);
	if (!user) return <p>No estás autenticado</p>;

	return (
		<main className="flex-1 flex flex-col h-full w-full justify-center items-center bg-gray-50 px-4 py-8 md:px-8">
			<div className="max-w-3xl mx-auto">
				<UserProfileSection {...user} mode="owner" />
			</div>
		</main>
	);
};

export default MyAccount;
