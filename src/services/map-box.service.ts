import { MAP_BOX_CONFIG } from '../configs/map-box.config';
import { Observable } from '@reactivex/rxjs';
import { MapProps } from '../models/components/map-box/map.model';
// tslint:disable

export async function getTileData(tileIds: string[]): Promise<{[prop: string]: any}> {
	const base: string = 'https://api.mapbox.com/v4/mapbox.comic.json';
	const params: Map<string, string> = new Map<string, string>();
	tileIds.forEach((place: string) => 'access_token', MAP_BOX_CONFIG.accessToken);
	const response = await fetchMapRequest(base, params);
	return response.json();
}

export async function getPlaceData(...placeNames: string[]): Promise<MapProps> {
	const mode = 'mapbox.places';
	const base: string = `https://api.mapbox.com/geocoding/v5/${mode}/{query}.json/`;
	const params: Map<string, string> = new Map<string, string>();
	placeNames.forEach((place: string) => 'access_token', MAP_BOX_CONFIG.accessToken);
	const response = await fetchMapRequest(base, params);
	return response.json();
}

export async function getGeoData(lon: string, lat: string, ): Promise<MapProps> {
	const mode = 'mapbox.places';
	const query = `?longitude=${lon}&latitude=${lat}`;
	const base: string = `https://api.mapbox.com/geocoding/v5/${mode}/${query}.json/`;
	const response = await fetchMapRequest(base);
	return response.json();
}

export async function fetchMapRequest(
	url: string,
	params: Map<string,string> = new Map<string, string>()): Promise<Response> {
	const param$ = Observable.of(params);

	// fix any
	const paramString: string = await param$
		.reduce(
			(acc: string, curr: any) => {
				acc += `${curr.getKey()}=${curr.getValue()}`
			},
			'?'
		).toPromise();
	const req: Request = new Request(url + paramString);
	return await fetch(req);
}

export async function getStaticMap<T> (
	lon: string, lat: string,
	zoom: string, bearing: string,
	pitch: string, mapSize: string[] = [window.screenY.toString(), window.screenX.toString()],
	scale: string = '@2x', overlay: string = 'comic'

): Promise<T> {
	const base: string = `https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/${overlay}/${lon},${lat},${zoom},${bearing},${pitch}/${mapSize[0]}x${mapSize[0]}${scale}?accessToke=${MAP_BOX_CONFIG.accessToken}`;
    const response: Response = await fetchMapRequest(base);
    return await response.json();
}

// const bas"https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/-122.4241,37.78,14.25,0,60/600x600?access_token=your-access-token"
//
// # retrieve a map at 0 longitude, 10 latitude, zoom 3,
// # and bearing 20. Pitch will default to 0.
// curl "https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/0,10,3,20/600x600?access_token=your-access-token"
//
// # retrieve a map at 0 longitude, 0 latitude, zoom 2.
// # bearing & pitch default to 0.
// curl "https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/0,0,2/600x600?access_token=your-access-token"
//
// # retrieve a map with a custom marker overlay
// curl "https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/url-https%3A%2F%2Fmapbox.com%2Fimg%2Frocket.png(-76.9,38.9)/-76.9,38.9,15/1000x1000?access_token=your-access-token"
//
// # retrieve a map with a geojson overlay
// curl "https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/geojson(%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B-73.99%2C40.7%5D%7D)/-73.99,40.70,12/500x300?access_token=your-access-token"
//
// # retrieve a map with 2 points and a polyline overlay,
// # with it's center point automatically determined with `auto`
// curl "https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/pin-s-a+9ed4bd(-122.46589,37.77343),pin-s-b+000(-122.42816,37.75965),path-5+f44-0.5(%7DrpeFxbnjVsFwdAvr@cHgFor@jEmAlFmEMwM_FuItCkOi@wc@bg@wBSgM)/auto/500x300?access_token=your-access-token"
