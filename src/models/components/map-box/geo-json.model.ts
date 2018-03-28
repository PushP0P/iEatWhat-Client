export interface GeoJsonModel {
	type: string;
	geometry: {
		type: string;
		coordinates: number[];
		properties: {
			name: string;
		};
	};
}
