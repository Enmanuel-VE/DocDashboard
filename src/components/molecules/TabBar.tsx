import type { Dispatch, SetStateAction } from "react";
import TabButton from "../atoms/TabButton";
import type { Tab } from "../pages/HospitalPage";

interface Props {
	tabs: string[];
	activeTab: string;
	setActiveTab: Dispatch<SetStateAction<Tab>>;
	setSearch: (value: string) => void;
}

const TabBar = (props: Props) => (
	<div className="flex flex-row-reverse bg-gray-100 rounded-md">
		{props.tabs.map((tab) => (
			<TabButton
				key={tab}
				label={tab}
				active={props.activeTab === tab}
				onClick={() => {
					props.setActiveTab(tab as Tab);
					props.setSearch("");
				}}
			/>
		))}
	</div>
);

export default TabBar;
