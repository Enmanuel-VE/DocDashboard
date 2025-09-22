interface Props {
	active: boolean;
	onClick: () => void;
	children: React.ReactNode;
}

const AuthButton = (props: Props) => (
	<button
		onClick={props.onClick}
		className={`w-full flex flex-row items-center justify-center cursor-pointer text-sm rounded-sm px-3 py-1.5 ${
			props.active ? "bg-[#fafafa] shadow-sm" : ""
		}`}
	>
		{props.children}
	</button>
);

export default AuthButton;
