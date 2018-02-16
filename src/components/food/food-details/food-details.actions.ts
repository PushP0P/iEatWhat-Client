import { Action } from '../../../models/action.model';
import { USDAReport } from '../../../models/usda.model';

export function actionUpdateFoodDetails(foodDetails: USDAReport): Action {

	return {
		type: 'FOOD_DETAILS_UPDATED',
		payload: foodDetails
	};
}
