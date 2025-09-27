import Markdown from "react-markdown";
import type { HospitalDetail } from "../organisms/HospitalTabsSection";
import HospitalInfoGrid from "./HospitalInfoGrid";

interface Props {
	hospital: HospitalDetail;
}

const HospitalOverviewSection = (props: Props) => (
	<section className="flex flex-col gap-6">
		<div className="prose prose-sm max-w-none text-gray-700">
			<Markdown
				components={{
					p: ({ ...props }) => (
						<p
							className="mb-4 leading-relaxed text-sm text-gray-700"
							{...props}
						/>
					),
					h2: ({ ...props }) => (
						<h2
							className="text-lg font-semibold text-gray-800 mt-5 mb-2 border-b pb-1"
							{...props}
						/>
					),
					ul: ({ ...props }) => (
						<ul
							className="list-disc list-inside mb-4 text-sm text-gray-700"
							{...props}
						/>
					),
					ol: ({ ...props }) => (
						<ol
							className="list-decimal list-inside mb-4 text-sm text-gray-700"
							{...props}
						/>
					),
					li: ({ ...props }) => (
						<li className="mb-1 text-sm text-gray-700" {...props} />
					),
					a: ({ ...props }) => (
						<a
							className="text-sm text-rose-600 underline hover:text-rose-700 transition-colors"
							target="_blank"
							rel="noopener noreferrer"
							{...props}
						/>
					),
					blockquote: ({ ...props }) => (
						<blockquote
							className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4"
							{...props}
						/>
					),
				}}
			>
				{props.hospital.description}
			</Markdown>
		</div>
		<HospitalInfoGrid
			address={props.hospital.address}
			zone={props.hospital.zone}
			phone={props.hospital.phone}
			email={props.hospital.email}
		/>
	</section>
);

export default HospitalOverviewSection;
