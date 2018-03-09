import { StoreService } from '../services/store.service';
import { RouteComponentProps } from 'react-router';
import { USDANutrient } from './usda/usda-report.model';
import { USDAFood } from './usda/usda-report.model';

export interface Category {
	id: string;
	label: string;
	icon: string;
	nutrients: USDANutrient[];
	foodWith: Map<string, USDAFood>;
}

export interface FoodMeta {
	stars: number;
	reviewed: boolean;
	reviews: number;
	tags: Set<string>;
	categories: Set<Category>;
	foodGroup: string;
	updatedOn: number;
	foundOutlets: Set<string>;
}

export interface FoodDetailsComponentProps {
	store: StoreService;
	routeComponentProps: RouteComponentProps<HTMLDivElement>;
}

export interface FoodDetailsComponentState {
	dataReady: boolean;
	modalVisible: boolean;
	report: FoodProduct;
}

export const FOOD_DETAILS_STATE_INIT: FoodDetailsComponentState = {
	dataReady: false,
	modalVisible: false,
	report: <FoodProduct>{}
};

export interface FoodProduct extends FoodMeta {
	ndbno: string;
	upc: string;
	imageURL: string;
	categories?: Category[];
}
