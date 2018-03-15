import { MapBoxLocation } from '../models/components/map-box/map-box.model';
import { getGeoData } from './map-box.service';
import { BehaviorSubject } from '@reactivex/rxjs';
import { Observable } from '@reactivex/rxjs';
import { LocationInfo } from '../models/location.model';

export class LocationService {
	public locationSource: BehaviorSubject<LocationInfo> = new BehaviorSubject(<LocationInfo> {});
	public location$: Observable<LocationInfo> = this.locationSource.asObservable();
}

export async function getDeviceLocation(): Promise<MapBoxLocation | PositionError | {} | void> {
	if (!('geolocation' in navigator)) {
		alert('Location Service Unavailable');
		prompt('Please provide zipcode for location services.', 'no zip');
		return;
	}

	return await new Promise((resolve, reject): void => {
		const successhandler: PositionCallback = async (position: Position) => {
			const locationData = await getGeoData(
				position.coords.longitude.toString(),
				position.coords.latitude.toString());
			resolve(<MapBoxLocation> {
				locationData: locationData,
				long: position.coords.longitude,
				lat: position.coords.latitude
			});
		};

		const errorHandler: PositionErrorCallback = (error: PositionError) => {
			reject(<PositionError> error);
		};
		navigator.geolocation.getCurrentPosition(successhandler, errorHandler);
	});
}
