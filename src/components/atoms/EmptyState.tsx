interface Props {
	message?: string;
	className?: string;
}

const EmptyState = (props: Props) => {
	return (
		<div className={`text-center text-gray-500 text-sm ${props.className}`}>
			{props.message}
		</div>
	);
};
export default EmptyState;
