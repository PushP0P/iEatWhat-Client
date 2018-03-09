import { USDANutrient } from '../usda/usda-report.model';

export interface CategoryProps {
	id: string;
	label: string;
	icon: string;
	description: string;
	nutrients: Set<USDANutrient>;
}
