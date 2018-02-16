export interface ContentCache {
	[components: string]: {
		[eventType: string]: EventRequest;
	};
}

export interface BundleCache {
	version: {
		updatedOn: number;
		hash: string;
	};
	bundle: {
		hash: string;
		file: File;
	};
}

export interface EventRequest {
	request: Request;
	response: Response;
}
