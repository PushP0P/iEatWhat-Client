export interface CategoriesSelectProps {
	categories: string[];
	selected: SelectedCategories;
	selectHandler: (selection: string) => void;
}

export interface SelectedCategories {
	[category: string]: boolean;
}
