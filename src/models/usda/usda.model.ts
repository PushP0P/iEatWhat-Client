import { USDAItem } from './usda-report.model';
import { USDAReport } from './usda-report.model';
import { USDAList } from './usda-report.model';

export interface USDAParams {
	fg?: string;
	searchTerms?: string;
	format?: string;
	max?: number;
	offset?: number;
	ndbno?: string[];
	nutrients?: string[];
	sort?: string;
	subset?: string;
	nutrientId?: string;
	start?: number;
	end?: number;
}

export interface SearchList {
	ds: string;
	end: number;
	group: string;
	item: USDAItem[];
	q: string;
	sort: string;
	sr: string;
	start: number;
	total: number;
}

export interface ReportFetchResponse {
	api: string;
	count: number;
	notFound: number;
	foods: USDAReport[];
}

export interface SearchFetchResponse {
	api: string;
	count: number;
	notFound: number;
	list: SearchList;
}

export interface USDADBOptions {
	params?: USDAParams;
	requestType?: USDARequestType;
}

export const USDA_SEARCH_KEYS = {
	apiKey: 'api_key',
	searchTerms: 'q',
	dataSource: 'ds',
	foodGroupID : 'fg',
	sort : 'sort',
	maximumRows : 'max',
	beginningRow : 'offset',
	resultsFormat: 'format',
	reportType: 'type',
	ndbno: 'ndbno'
};

export declare type USDAFetchResponse = SearchFetchResponse & ReportFetchResponse;
export declare type USDARequestType = ('search' | 'V2/reports' | 'list' | 'nutrients');
export declare type USDASearchResult = void & USDAReport & USDAItem[] & USDAList;
