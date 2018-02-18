import { MapBoxLocation } from '../models/components/map-box.model';

export async function getDeviceLocation(): Promise<MapBoxLocation | PositionError | {} | void> {
	if (!('geolocation' in navigator)) {
		alert('Location Service Unavailable');
		return;
	}
	return await new Promise((resolve, reject): void => {
		const successhandler: PositionCallback = (position: Position) => {
			resolve(<MapBoxLocation> {
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
