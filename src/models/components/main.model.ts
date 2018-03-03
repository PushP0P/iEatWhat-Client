import { FoodItem } from '../food.model';
import { StoreService } from '../../services/store.service';
import { AuthServices } from '../../services/auth.service';

export interface MainComponentProps {
	store: StoreService;
	auth: AuthServices;
}

export interface MainComponentState {
	appReady: boolean;
	navbarIsExtended: boolean;
	isWideScreen: boolean;
	isLoggedIn: boolean;
	selectedFoodItem: FoodItem;
}

export const MAIN_COMPONENT_STATE_INIT: MainComponentState = {
	appReady: false,
	navbarIsExtended: false,
	isWideScreen: false,
	isLoggedIn: false,
	selectedFoodItem: <FoodItem> {}
};
