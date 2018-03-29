import { StoreService } from '../services/store.service';
import { RouteComponentProps } from 'react-router';

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
	foodName: string;
	brandName: string;
	groupName: string;
	metadata: string;
	source: string;
	ndbno: string;
	tags: string;
	photo: string;
	updatedAt: string;
	categories: string[];
}
