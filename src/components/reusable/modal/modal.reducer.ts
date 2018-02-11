import { Action } from '../../../models/action.model';
import { ModalComponentState } from '../../../models/modal.model';

export function modalReducer(action: Action, currentState: ModalComponentState): ModalComponentState {
	const {type} = action;

	switch (type) {
		case'TOGGLE_VISIBILITY_ON':
			return {...currentState, visible: true};
		case'TOGGLE_VISIBILITY_OFF':
			return {...currentState, visible: false};
		default:
			return currentState;
	}
}
