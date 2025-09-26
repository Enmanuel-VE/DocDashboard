import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router";

interface Props {
	className?: string;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isOpen: boolean;
}

const NavbarItems = [
	{
		link: "/account",
		text: "Mi Cuenta",
		id: () => crypto.randomUUID(),
	},
	{
		link: "/search",
		text: "Buscar",
		id: () => crypto.randomUUID(),
	},
	{
		link: "/",
		text: "Inicio",
		id: () => crypto.randomUUID(),
	},
];

const Navbar = (props: Props) => {
	const toggleMenu = () => props.setIsOpen((prev) => !prev);

	return (
		<nav className={props.className}>
			<div className="flex flex-row-reverse md:flex-row min-h-[10dvh] justify-between px-4 sm:px-6 lg:px-8">
				<header className="flex-shrink-0 flex items-center">
					<Link to="/" className="text-2xl font-bold text-rose-500">
						DocDashboard
					</Link>
				</header>

				<div className="hidden md:flex md:items-center md:space-x-8">
					{NavbarItems.map((item) => (
						<Link
							key={item.id()}
							to={item.link}
							className="text-gray-600 hover:text-rose-500 px-3 py-2 rounded-md text-sm font-medium"
						>
							{item.text}
						</Link>
					))}
				</div>

				<div className="flex items-center md:hidden">
					<button
						className="cursor-pointer text-rose-500"
						type="button"
						onClick={toggleMenu}
					>
						<AiOutlineMenu />
					</button>
				</div>
			</div>

			<div
				className={`flex flex-col transition-all duration-300 absolute top-0 left-0 backdrop-blur-sm h-screen w-full z-30 ${
					props.isOpen ? "" : "hidden"
				}`}
			/>

			<aside
				className={`flex flex-row w-full h-full fixed left-0 top-0 z-50 transition-transform duration-300  ${
					props.isOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="flex flex-col flex-1/2 h-full  bg-white border-r border-gray-200 shadow-xl">
					<div className="flex flex-row items-center w-full p-4 h-[10dvh]">
						<button
							className=" cursor-pointer text-rose-500"
							type="button"
							onClick={toggleMenu}
						>
							<AiOutlineMenu />
						</button>
					</div>
					<div className="flex-1 flex flex-col gap-2 px-4 overflow-y-auto">
						{NavbarItems.map((item) => (
							<Link
								key={item.id()}
								to={item.link}
								className="font-medium text-xl text-rose-400 hover:text-rose-500"
							>
								{item.text}
							</Link>
						))}
					</div>
				</div>

				<div
					className="flex flex-col flex-1/2 z-40"
					onClick={toggleMenu}
				></div>
			</aside>
		</nav>
	);
};

export default Navbar;
