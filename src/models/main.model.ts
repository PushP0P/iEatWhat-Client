import { FoodItem } from './food.model';

export interface MainComponentProps {

}

export interface MainComponentState {
	appReady: boolean;
	selectedFoodItem: FoodItem;
}

export const MAIN_COMPONENT_STATE_INIT: MainComponentState = {
	appReady: false,
	selectedFoodItem: <FoodItem> {}
};
