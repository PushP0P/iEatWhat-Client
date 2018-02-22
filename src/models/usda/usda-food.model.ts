export interface USDAList {
	q: string;
	item: USDAItem[];
	ds: string;
	start: number;
	end: number;
	offset: number;
	total: number;
	sort: string;
	fg: string;
	sr: string;
}

export interface USDAItem {
	ndbno?: string;
	name?: string;
	group?: string;
	ds?: string;
	offset?: number;
}

export interface USDASearchResponse {
	list: USDAList;
}

// TODO Look into why & works and not <t> | <k>
export type USDASearchResult = (
	& USDAItem[]
	& USDASearchResponse
);
