interface Props {
	children: React.ReactNode;
}

const AuthTemplate = (props: Props) => (
	<div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA]">
		{props.children}
	</div>
);

export default AuthTemplate;
