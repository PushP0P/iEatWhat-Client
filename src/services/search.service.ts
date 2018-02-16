import { USDA_CONFIG } from '../configs/usda.private.config';
import { ListOptions } from '../models/usda.model';
import { ReportOptions } from '../models/usda.model';
import { USDA_SEARCH_KEYS } from '../models/usda.model';
import { FoodSearchOptions } from '../models/usda.model';
import { USDASearchResult } from '../models/usda-food.model';
import { mixParamsURL } from './rest-service';
const rootPath: string = 'https://api.nal.usda.gov/ndb';
const FORMAT_PARAM = 'format=json';

interface USDADBOptions {
	params?: ReportOptions | ListOptions | FoodSearchOptions;
	requestType: 'nutrients' | 'search' | 'lists' | 'food';
}
// TODO Consider cleaning

function makeUSDAEndpoint(
	options: USDADBOptions = {
		requestType: 'search'
	}
): URLSearchParams  | void {
	const baseURL: string = rootPath + options;
	Object.keys(options.params).forEach()
	return mixParamsURL(
		baseURL,
		{
		[USDA_SEARCH_KEYS.search_terms]: options.query,
		[USDA_SEARCH_KEYS.apiKey]: USDA_CONFIG.apiKey
	});
}

export async function searchUSDA(options: USDADBOptions): Promise<USDASearchResult> {
	const url: string | string[] = await !Array.isArray(options.queries)
		? makeUSDAEndpoint({
			...options,
		})
		: makeUSDAEndpoint(options);
	const response: Response = await fetch(url.trim());
	if (!response) {
		return Promise.reject('Error with USDA search.');
	}
	return response.json();
}

export const transformInputValToQuery = (val: string): string[] => {
	return val.split(' ');
};
