import { Reducer } from '../../../models/store/reducer.model';
import { Action } from '../../../models/store/action.model';
import { FoodDetailsComponentState } from '../../../models/food.model';

export const foodDetailsReducer: Reducer = (
	action: Action,
	currentState: FoodDetailsComponentState
): FoodDetailsComponentState => {
	const {type, payload} = action;

	switch (type) {
		case'RETRIEVING_REPORT':
			return {...currentState, ...payload};
		case'REPORT_RECEIVED':
			return {...currentState, ...payload};
		default:
			return currentState;
	}
};
