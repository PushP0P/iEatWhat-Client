import { Action } from '../../../models/store/action.model';
import { USDAReport } from '../../../models/usda/usda.model';

export function actionUpdateFoodDetails(foodDetails: USDAReport): Action {
	return {
		type: 'FOOD_DETAILS_UPDATED',
		payload: foodDetails
	};
}
