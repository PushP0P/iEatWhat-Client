import { Action } from '../../../models/store/action.model';

export function toggleModalVisibilityOn(): Action {
	return {
		type: 'MODAL_VISIBILITY_ON',
	};
}

export function toggleModalVisibilityOff(): Action {
	return {
		type: 'MODAL_VISIBILITY_OFF',
	};
}
