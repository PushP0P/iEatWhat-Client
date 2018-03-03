import { MainComponentState } from '../../models/components/main.model';
import { Action } from '../../models/store/action.model';
import { FoodItem } from '../../models/food.model';
import { Reducer } from '../../models/store/reducer.model';

export const mainReducer: Reducer = function(action: Action, currentState: MainComponentState): MainComponentState {
	const {type, payload} = action;
	switch (type) {
		case'APP_DONE_BOOTING':
			return {...currentState, appReady: true};
		case'FOOD_ITEM_SELECTED':
			return {...currentState, selectedFoodItem: payload};
		case'ENABLE_DROP_DOWN':
			return {...currentState, ...payload};
		case'DISABLE_DROP_DOWN':
			return {...currentState, ...payload};
		case'IS_LOGGED_IN':
			return {...currentState, ...payload};
		case'IS_LOGGED_OUT':
			return {...currentState, ...payload};
		default:
			return currentState;
	}
};

export function appDoneBooting(): Action {
	return {type: 'APP_DONE_BOOTING', payload: {}};
}

export function foofItemSelected(foodItem: FoodItem): Action {
	return {type: 'FOOD_ITEM_SELECTED', payload: foodItem};
}
