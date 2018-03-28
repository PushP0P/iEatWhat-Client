import { StoreService } from '../../../services/store.service';
import { MapProps } from './map.model';
import { GeoJsonModel } from './geo-json.model';

export interface MapBoxComponentProps {
	locations: Map<string, MapBoxLocation>;
	mapName: string;
	store: StoreService;
}

export interface MapBoxComponentState {
	id: string;
	dataReady: boolean;
	targetLocation: MapBoxLocation;
	targetDetails: DestinationDetails;
	userLocation: MapBoxLocation;
	distance: number;
	eta: number;
	zoom: number;
	navigationOn: boolean;
	navigationType: 'walking' | 'driving' | 'public';
	mapData: MapProps;
	geoData: GeoJsonModel;
	deviceLocation: MapBoxLocation;
	showModal: boolean;
	wheelValue: number;
}

export interface MapBoxLocation {
	long: number;
	lat: number;
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
	deviceLocation: <MapBoxLocation> {},
	mapData: <MapProps> {},
	geoData: <GeoJsonModel> {},
	dataReady: false,
	id: '',
	targetLocation: <MapBoxLocation> {},
	targetDetails: <DestinationDetails> {},
	userLocation: <MapBoxLocation> {},
	distance: 0,
	eta: 0,
	zoom: 9,
	navigationOn: false,
	navigationType: 'walking',
	showModal: false,
	wheelValue: 0
};
