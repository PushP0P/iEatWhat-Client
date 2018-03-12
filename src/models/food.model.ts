import { StoreService } from '../services/store.service';
import { RouteComponentProps } from 'react-router';
import { ReviewProps } from './components/review.model';
import { CategoryProps } from './components/category.model';

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
	report: <FoodProduct> {}
};

export interface FoodProduct {
	ndbno: string;
	name: string;
	upc?: string;
	shortDescription: string;
	imageURL?: string;
	categories?: CategoryProps[];
	reviewed: boolean;
	reviews: ReviewProps[];
	foodGroup: string;
	updatedOn: number;
	foundOutlets?: Set<string>;
	stars?: number;
}
