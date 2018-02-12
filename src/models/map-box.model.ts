export interface MapBoxComponentProps {
	locations: Map<string, MapBoxLocation>
	mapName: string;
}

export interface MapBoxComponentState {
	dataReady: boolean;
	targetLocation: MapBoxLocation
	targetDetails: DestinationDetails;
	userLocation : MapBoxLocation;
	distance: number;
	eta: number;
	zoom: number,
	navigationOn: boolean;
	navigationType: 'walking' | 'driving' | 'public'
}

export interface MapBoxLocation {
	long: number,
	lat: number,
}

export interface DestinationDetails {
	id: string;
	businessName: string;
	street: string;
	suite?: string;
	city: string;
	county: string;
	state: string;
	zipCode: string;
	storeFrontImgURL: string;
}

export const MAP_BOX_STATE_INIT: MapBoxComponentState = {
	dataReady: false,

	targetLocation: <MapBoxLocation> {},
	targetDetails: <DestinationDetails> {},
	userLocation: <MapBoxLocation> {},
	distance: 0,
	eta: 0,
	zoom: 9,
	navigationOn: false,
	navigationType: 'walking',
};
