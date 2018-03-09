import { USDAFetchResponse } from '../models/usda/usda.model';
import { eventRequest } from './rest-service';

export async function searchByTerms(searchTerms: string): Promise<USDAFetchResponse> {

	return await eventRequest({
		type: 'SEARCH',
		payload: searchTerms
	});
}
