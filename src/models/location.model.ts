export interface LocationInfo {
	current: {
		address?: string;
		street?: string;
		city: string;
		state: string;
		zip: string;
		country: string;
	};
}
