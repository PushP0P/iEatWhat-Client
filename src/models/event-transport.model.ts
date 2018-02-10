export interface EventTransport {
	type: string;
	payload: any;
}

export interface EventResponse extends Response {
	ok: boolean;
	message?: string;
	body: any;
	eventType: string;
}
