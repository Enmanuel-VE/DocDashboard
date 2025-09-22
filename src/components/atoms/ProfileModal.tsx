interface Props {
	children: React.ReactNode;
	modalId: string;
	ref: React.Ref<HTMLDialogElement>;
}

const ProfileModal = (props: Props) => {
	const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
		if (e.target === e.currentTarget) {
			e.currentTarget.close();
		}
	};

	return (
		<dialog
			id={props.modalId}
			className="modal"
			ref={props.ref}
			onClick={handleBackdropClick}
		>
			<div className="modal-box">{props.children}</div>
		</dialog>
	);
};

export default ProfileModal;
