import { MapBoxComponentState } from '../../models/components/map-box/map-box.model';
import { Action } from '../../models/store/action.model';

export function mapBoxReducer(action: Action, currentState: MapBoxComponentState) {
	const {type, payload} = action;
	switch (type) {
		case'MAP_DATA_READY':
			return {...currentState, ...payload};
		case'MAP_UPDATE_TRIGGERED':
			return {...currentState, ...payload};
		case'MAP_UPDATE_DONE':
			return {...currentState, ...payload};
		case'MAP_DATA_LOADING':
			return {...currentState, ...payload};
		case'MAP_MODAL_SHOW':
			return {...currentState, ...payload};
		case'MAP_MODAL_HIDE':
			return {...currentState, ...payload};
		case'MAP_DIRECTIONS_ON':
			return {...currentState, ...payload};
		case'MAP_DIRECTIONS_OFF':
			return {...currentState, ...payload};
		case'MAP_NEW_DESTINATION':
			return {...currentState, ...payload};
		case'MAP_ARRIVED':
			return {...currentState, ...payload};
		case'MAP_ZOOM_IN':
			return {...currentState, ...payload};
		case'MAP_ZOOM_OUT':
			return {...currentState, ...payload};
		default:
			return currentState;
	}
}
