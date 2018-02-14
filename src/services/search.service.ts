import {
	USDA_SEARCH_KEYS, USDAListParams, USDARequestParams,
	USDASearchParams
} from '../models/usda.model';
import { FoodItem } from '../models/food.model';
import { USDA_CONFIG } from '../configs/usda.private.config';
const rootPath: string = 'https://api.nal.usda.gov/ndb';

interface USDADBOptions {
	url?: string;
	queries: string[];
	params?: USDASearchParams | USDAListParams | USDARequestParams;
	requestType?: 'report' | 'search' | 'list';
}

function makeUSDAEndpoint(
	options: USDADBOptions
): string {
	const FORMAT_PARAM = 'format=json';
	const queryString: string = options.queries.reduce(
		(
			acc: string,
			query: string
		) => {
			return `${acc}&${USDA_SEARCH_KEYS.search_terms}=${query}`;
		},'');
	
	function interpolateURL(): string {
		switch (options.requestType) {
			case'search':
				console.log('hit search url', options);
				return handleSearch();
			case'report':
				return handleReport();
			case'list':
				return handleList();
			default:
				return JSON.stringify({});
		}
	}

	const urlString = interpolateURL();
	console.log('url', urlString);
	return urlString;
	
	function handleSearch(): string {
		if (options && options.params) {
			const paramsString: string = Object.keys(options.params).reduce(
				(acc: string, key: string) => {
					if(options && options.params) {
						return `${acc}&${USDA_SEARCH_KEYS[key]}=${options.params[key]}`
					}
					return acc;
				}, '');
			return `${options.url || rootPath}/${options.requestType}/?${queryString}&${paramsString}&${FORMAT_PARAM}&${USDA_SEARCH_KEYS.apiKey}=${USDA_CONFIG.apiKey}`;
		}
		return `${options.url || rootPath}/${options.requestType}/?${queryString}&${FORMAT_PARAM}&${USDA_SEARCH_KEYS.apiKey}=${USDA_CONFIG.apiKey}`;
	}
	
	function handleReport(): string {
		if (options && options.params) {
			const paramsString: string = Object.keys(options.params).reduce(
				(acc: string, key: string) => {
					if(options && options.params) {
						return `${acc}&${USDA_SEARCH_KEYS[key]}=${options.params[key]}`
					}
					return acc;
				}, '');
			return `${options.url || rootPath}/${options.requestType}/?${queryString}&${paramsString}&${FORMAT_PARAM}&${USDA_SEARCH_KEYS.apiKey}=${USDA_CONFIG.apiKey}`;
		}
		return `${options.url || rootPath}/${options.requestType}/?${queryString}&${FORMAT_PARAM}&${USDA_SEARCH_KEYS.apiKey}=${USDA_CONFIG.apiKey}`;
		
	}
	
	function handleList(): string {
		if (options && options.params) {
			const paramsString: string = Object.keys(options.params).reduce(
				(acc: string, key: string) => {
					if(options && options.params) {
						return `${acc}&${USDA_SEARCH_KEYS[key]}=${options.params[key]}`
					}
					return acc;
				}, '');
			return `${options.url || rootPath}/${options.requestType}/?${queryString}&${paramsString}&${FORMAT_PARAM}&${USDA_SEARCH_KEYS.apiKey}=${USDA_CONFIG.apiKey}`;
		}
		return `${options.url || rootPath}/${options.requestType}/?${queryString}&${FORMAT_PARAM}&${USDA_SEARCH_KEYS.apiKey}=${USDA_CONFIG.apiKey}`;
		
	}
	// add query

	// https://api.nal.usda.gov/ndb/search/?format=json&q=butter&sort=n&max=25&offset=0&api_key=DEMO_KEY

	// https://api.nal.usda.gov/ndb/V2/reports?ndbno=01009&ndbno=45202763&ndbno=35193&type=f&format=json&api_key=DEMO_KEY

	// if add pagination

	// if add report type
}

export async function queryFood(options: USDADBOptions): Promise<Set<FoodItem>> {
	const url: string = await makeUSDAEndpoint(options);
	const response: Response = await fetch(url);
	console.log('get', response);
	return response.json();
}

export const transformInputValToQuery = (val: string): string[] => {
	return val.split(' ');
};
