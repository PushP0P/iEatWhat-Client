import { Action } from '../../models/store/action.model';
import { MapBoxComponentState } from '../../models/components/map-box/map-box.model';

export function mapActionMapDataReady(): Action {
	return {
		type: 'MAP_DATA_READY',
		payload: {dataReady: true}
	};
}

export function mapActionUpdate(stateValues: MapBoxComponentState | {}): Action {
	return {
		type: 'MAP_UPDATE_TRIGGERED',
		payload: {dataReady: false}
	};
}

export function mapActionDataIncomplete(): Action {
	return {
		type: 'MAP_DATA_LOADING',
		payload: {dataReady: false}
	};
}

export function mapActionModalShow(): Action {
	return {
		type: 'MAP_MODAL_SHOW',
		payload: {showModal: true}
	};
}

export function mapActionModalHide(): Action {
	return {
		type: 'MAP_MODAL_HIDE',
		payload: {showModal: false}
	};
}

export function mapActionDirectionsOn(): Action {
	return {
		type: 'MAP_DIRECTIONS_ON',
		payload: {dataReady: true}
	};
}

export function mapActionDirectionsOff(): Action {
	return {
		type: 'MAP_DIRECTIONS_OFF',
		payload: {dataReady: true}
	};
}

export function mapActionDestinationOn(): Action {
	return {
		type: 'MAP_DESTINATION_ON',
		payload: {}
	};
}

export function mapActionArrived(): Action {
	return {
		type: 'MAP_ARRIVED',
		payload: {}
	};
}

export function mapActionZoomIn(magnitude: number): Action {
	return {
		type: 'MAP_ZOOM_IN',
		payload: {mapZoomOut: magnitude}
	};
}

export function mapActionZoomOuta(magnitude: number): Action {
	return {
		type: 'MAP_ZOOM_OUT',
		payload: {mapZoomOut: magnitude}
	};
}
