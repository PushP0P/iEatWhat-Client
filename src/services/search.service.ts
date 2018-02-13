// import { FoodItem } from '../models/food.model';
import { USDA_SEARCH_KEYS, USDARequestOptions } from '../models/usda.model';
import { FoodItem } from '../models/food.model';
import { httpRequest } from './rest-service';
import { USDA_CONFIG } from '../configs/usda.private.config';

const rootPath: string = 'https://api.nal.usda.gov/ndb';

function makeUSDAEndpoint(
	queries: string[],
	options?: USDARequestOptions,
	url: string = rootPath,
	requestType: 'report' | 'search' | 'list' = 'search'
): string {
	function insertOptions(): string {
		switch (requestType) {
			case'search':
				return queries.reduce(
					(acc: string, query: string) => {
						return `${acc}&${USDA_SEARCH_KEYS.search_terms}=${query}`;
					},
					''
				);
			case'report':
				return '';
			case'list':
				return '';
			default:
				return '/';
		}
	}

	const urlString = `${url}/${requestType}/?${options.search.queries}&${insertOptions()}&${USDA_SEARCH_KEYS.apiKey}=${USDA_CONFIG.apiKey}`;
	console.log('url', urlString);
	return urlString;
	// add query

	// https://api.nal.usda.gov/ndb/search/?format=json&q=butter&sort=n&max=25&offset=0&api_key=DEMO_KEY

	// https://api.nal.usda.gov/ndb/V2/reports?ndbno=01009&ndbno=45202763&ndbno=35193&type=f&format=json&api_key=DEMO_KEY

	// if add pagination

	// if add report type
}

export async function queryFood(query: string[]): Promise<Set<FoodItem>> {
	const url: string = await makeUSDAEndpoint(query);
	const response: Response = await httpRequest(url, 'GET');
	console.log('get', response);
	return response.json();
}

export const transformInputValToQuery = (val: string): string[] => {
	return val.split(' ');
};
