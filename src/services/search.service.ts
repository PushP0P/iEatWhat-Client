// tslint:disable
// import { USDA_CONFIG } from '../configs/usda.private.config';
import { ListOptions } from '../models/usda.model';
import { ReportOptions } from '../models/usda.model';
// import { USDA_SEARCH_KEYS } from '../models/usda.model';
import { FoodSearchOptions } from '../models/usda.model';
import { USDASearchResult } from '../models/usda-food.model';
// import { mixParamsURL } from './rest-service';
// const rootPath: string = 'https://api.nal.usda.gov/ndb';

interface USDADBOptions {
	params?: ReportOptions | ListOptions | FoodSearchOptions;
	requestType: 'nutrients' | 'search' | 'lists' | 'food';
}
// TODO Consider cleaning

// function makeUSDAEndpoint(
// 	options: USDADBOptions = {
// 		requestType: 'search'
// 	}
// ): URLSearchParams | void {
// 	const baseURL: string = rootPath + options;
// 	const params= Object.keys(options.params).reduce((acc, val) => {
// 		return {...acc, [val]: options.params[val] }
// 	}, {});
// 	const paramURL = mixParamsURL(
// 		baseURL,
// 		{
// 			'format': 'JSON',
// 			...params,
// 			[USDA_SEARCH_KEYS.apiKey]: USDA_CONFIG.apiKey
// 		}
// 	);
// 	console.log('paramsURL', paramURL);
// 	return paramURL;
// }

export async function searchUSDA(options: USDADBOptions): Promise<USDASearchResult> {
	 // const uSDAAPIString: URLSearchParams = makeUSDAEndpoint(options);
	// const response: Response = await fetch();
	// if (!response) {
	// 	return Promise.reject('Error with USDA search.');
	// }
	// return response.json();
}

export const transformInputValToQuery = (val: string): string[] => {
	return val.split(' ');
};
