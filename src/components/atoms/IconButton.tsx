type Props = {
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	active: boolean;
	activeIcon: React.ReactNode;
	inactiveIcon: React.ReactNode;
	className?: string;
};

const IconButton = (props: Props) => {
	return (
		<button onClick={props.onClick} className={`px-4 ${props.className}`}>
			{props.active ? props.activeIcon : props.inactiveIcon}
		</button>
	);
};

export default IconButton;
