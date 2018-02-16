import { ListOptions } from '../models/usda.model';
import { ReportOptions } from '../models/usda.model';
import { FoodSearchOptions } from '../models/usda.model';
import { USDASearchResult } from '../models/usda-food.model';
import { USDA_SEARCH_KEYS } from '../models/usda.model';
import { USDA_CONFIG } from '../configs/usda.private.config';
const rootPath: string = 'https://api.nal.usda.gov/ndb';

interface USDADBOptions {
	params?: ReportOptions | ListOptions | FoodSearchOptions;
	requestType: 'nutrients' | 'search' | 'lists' | 'food';
}
// TODO Consider cleaning

function makeUSDAEndpoint(
	options: USDADBOptions = {
		requestType: 'search'
	}
): URL | void {
	const baseURL: string = rootPath + '/' + options.requestType;
	const builtURL = new URL(baseURL);
	builtURL.searchParams.append(USDA_SEARCH_KEYS.results_format, 'JSON');
	Object.keys(options.params)
		.forEach((key) => {
			builtURL.searchParams.append(USDA_SEARCH_KEYS[key], options.params[key]);
	});
	builtURL.searchParams.append(USDA_SEARCH_KEYS.apiKey, USDA_CONFIG.apiKey);
	console.log(builtURL.toString());
	return builtURL;
}

export async function searchUSDA(options: USDADBOptions): Promise<USDASearchResult> {
	const uSDAAPIString: URL = <URL> makeUSDAEndpoint(options);
	const request = await new Request(uSDAAPIString.toString());
	const response: Response = await fetch(request);
	if (!response) {
		return Promise.reject('Error with USDA search.');
	}
	return response.json();
}

export const transformInputValToQuery = (val: string): string[] => {
	return val.split(' ');
};
