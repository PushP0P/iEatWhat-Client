import { EventTransport } from '../models/event-transport.model';

// const EVENT_PATH: string = `${window.location.hostname}/event`;
const EVENT_PATH: string = `http://localhost:5000/post/event`;
const ERROR_RESPONSE: ((message: string, eventType: string) => Response) = (message: string, eventType: string) => {
	return new Response({
		ok: false,
		message: message,
		eventType: eventType
	});
};

/**
 * Basic REST request that returns a promise.
 *
 * @param {string} path
 * @param {string} verb
 * @param {{}} headers
 * @param {{}} body
 * @returns {Promise<{}>}
 */
export async function httpRequest(path: string, verb?: string, headers?: {}, body?: {} ): Promise<Response> {
	const request: Request = await new Request(path, <RequestInit> {
		method: verb || 'get',
		cache: 'default',
		mode: 'cors',
		headers: headers ? await new Headers(headers) : {},
		body: body ? body : null
	});

	// might get stuck on stale content
	const cached = await new Cache()
		.match(request);
	if (cached) {
		return cached;
	}

	const response: Response | void = await fetch(request)
		.catch(err => alert('Fetch Error: ' + err));
	if (response) {
		return await response.json();
	}
	return ERROR_RESPONSE('Error with HTTPRequest', `${verb || 'get'}: ${path}`);
}

/**
 * Event Request - Sends a POST to the backend API and returns promise holding an EventResponse.
 * @param {EventTransport} eventTrans
 * @returns {Promise<EventResponse>}
 */
export async function eventRequest(eventTrans: EventTransport): Promise<any> {

	return new Promise(((resolve, reject) => {
		const data = new FormData();
		const xhr = new XMLHttpRequest();

		data.append('type', eventTrans.type);
		data.append('payload', eventTrans.payload);

		xhr.onreadystatechange = function() {
			if (this.readyState === 4) {
				resolve(this.responseText);
			}
		};

		xhr.onerror = (error) => {
			reject(error);
		};

		xhr.open('POST', EVENT_PATH);
		xhr.send(data);
	}));
}
