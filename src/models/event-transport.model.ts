export interface EventTransport {
	event: string;
	payload: EventPayload;
}

export interface EventPayload {
	type: string;
	body: any;
}

export interface EventResponse extends Response {
	ok: boolean;
	message?: string;
	body: any;
	event: string;
}
