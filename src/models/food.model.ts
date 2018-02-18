import { StoreService } from '../services/store.service';
import { USDAItem } from './usda/usda-food.model';
import { USDAReport } from './usda.model';

export interface Category {
	icon: string;
	label: string;
	foodGroups: string[];
	blackListedNutrients: FoodIngredient[];
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

export interface FoodDescription {
	name?: string;
	foodGroup?: string;
	blurb?: string;
}
export interface FoodIngredient {
	name?: string;
	nutrientGroup: string;
}

export interface FoodDetailsComponentProps {
	store: StoreService;
	foodId: string;
	topic: string;
}

export interface FoodDetailsComponentState {
	dataReady: boolean;
	foodDetails: USDAReport & FoodItem;
}

export const FOOD_DETAILS_STATE_INIT: FoodDetailsComponentState = {
	dataReady: false,
	foodDetails: <USDAReport & FoodItem> {},
};

export interface FoodItem extends FoodMeta, USDAItem, FoodDescription, FoodIngredient {
	id?: string;
	upc?: string;
	slug?: string;
	topic?: string;
	lastUpdated?: number;
	imageURL?: string;
	categoryTags?: string[];
}
