import React from "react";

type Props<T> = {
	items: T[];
	renderItem: (item: T) => React.ReactNode;
};

export default function ResultsGrid<T>({ items, renderItem }: Props<T>) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{items.map((item) => renderItem(item))}
		</div>
	);
}
