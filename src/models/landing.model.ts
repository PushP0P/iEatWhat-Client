import {FoodItem} from './food.model';

export interface LandingComponentProps {

}

export interface LandingComponentState {
	searchResultsVisible: boolean;
	query: string;
	selectedFoodItem: FoodItem;
}
