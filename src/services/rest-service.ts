import { EventTransport } from '../models/event-transport.model';

// const EVENT_PATH: string = `${window.location.hostname}/event`;
const EVENT_PATH: string = `//localhost:5000/post/event`;
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

export function mixParamsURL(url: string, params: {[key: string]: string | number }): URLSearchParams | void {
	const packedURL = Object
		.keys(params)
		.reduce((packedURL: URLSearchParams, key: string ): (URLSearchParams | void) => {
			return packedURL.append(key, params[key].toString());
	}, new URLSearchParams(url));
	console.log('packedURL', packedURL);
	return packedURL;
}
