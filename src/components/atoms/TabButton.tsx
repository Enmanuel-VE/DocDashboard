interface Props {
	label: string;
	active: boolean;
	onClick: () => void;
}

const TabButton = (props: Props) => (
	<button
		onClick={props.onClick}
		className={`cursor-pointer py-2 px-4 text-sm font-medium ${
			props.active
				? "bg-rose-500 text-white rounded-md"
				: "text-gray-500 hover:text-gray-700"
		}`}
	>
		{props.label}
	</button>
);

export default TabButton;
