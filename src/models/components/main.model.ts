import { FoodItem } from '../food.model';
import { StoreService } from '../../services/store.service';

export interface MainComponentProps {
	store: StoreService;
}

export interface MainComponentState {
	appReady: boolean;
	selectedFoodItem: FoodItem;
}

export const MAIN_COMPONENT_STATE_INIT: MainComponentState = {
	appReady: false,
	selectedFoodItem: <FoodItem> {}
};
