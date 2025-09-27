import React from "react";

interface Props<T> {
	items: T[];
	renderItem: (item: T) => React.ReactNode;
}

const ResultsGrid = <T,>(props: Props<T>) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{props.items.map((item) => props.renderItem(item))}
		</div>
	);
};

export default ResultsGrid;
