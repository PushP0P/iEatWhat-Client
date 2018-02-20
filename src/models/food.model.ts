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
	rating?: number;
	reviewed?: boolean;
	reviews?: number;
	restaurantItem?: boolean;
	storeItem?: boolean;
	homeMadeItem?: boolean;
	soldAt?: string[];
	verifiedCategories?: Category[];
	lastUpdated?: number;
}

export interface FoodDetailsComponentProps {
	store: StoreService;
	routeComponentProps: RouteComponentProps<HTMLDivElement>;
}

export interface FoodDetailsComponentState {
	dataReady: boolean;
	modalVisible: boolean;
}

export const FOOD_DETAILS_STATE_INIT: FoodDetailsComponentState = {
	dataReady: false,
	modalVisible: false
};

export interface FoodItem extends FoodMeta {
	id?: string;
	upc?: string;
	slug?: string;
	topic?: string;
	lastUpdated?: number;
	imageURL?: string;
	categoryTags?: string[];
}
