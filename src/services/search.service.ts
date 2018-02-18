import { USDADBOptions } from '../models/usda/usda.model';
import { USDA_CONFIG } from '../configs/usda.private.config';
import { USDAFetchResponse } from '../models/usda/usda.model';
import { USDA_SEARCH_KEYS } from '../models/usda/usda.model';

const rootPath: string = 'https://api.nal.usda.gov/ndb';

function makeUSDAEndpoint(options: USDADBOptions): string {
	const baseURL: string = rootPath + '/' + options.requestType;
	const url = new URL(baseURL);

	Object.keys(options.params)
		.forEach((key) => {
		url.searchParams
			.append(key, options.params[key]);
	});
	url.searchParams
		.append(USDA_SEARCH_KEYS.resultsFormat, 'json');
	url.searchParams
		.append(USDA_SEARCH_KEYS.apiKey, USDA_CONFIG.apiKey);
	return url.toString();
}

export async function queryUSDA(options: USDADBOptions): Promise<USDAFetchResponse> {
	const uSDAAPIString: string = <string> makeUSDAEndpoint(options);
	const request: Request = await new Request(
	uSDAAPIString.toString(),
	{
		headers: {
			Origin: window.location.href
			}
		});
	const response: Response = await fetch(request);
	return await !response
		? Promise.reject('Error with USDA search.')
		: response.json();
}
