import { Outlet } from "react-router";
import Navbar from "../organisms/Navbar";
import { useState } from "react";

const MainLayout = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="flex flex-col min-h-screen bg-gray-50 max-h-screen sm:max-h-auto">
			<Navbar
				setIsOpen={setIsOpen}
				isOpen={isOpen}
				className=" sm:shrink-0 sticky top-0 z-50 bg-white shadow-md"
			/>

			<div className="flex flex-col flex-1 overflow-y-auto">
				<Outlet />
			</div>
		</div>
	);
};

export default MainLayout;
