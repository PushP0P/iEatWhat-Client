import { EventTransport } from '../models/event-transport.model';

// const EVENT_PATH: string = `${window.location.hostname}/event`;
const EVENT_PATH: string = `http://localhost:5050/post/event`;

/**
 * Event Request - Sends a POST to the backend API and returns promise holding an EventResponse.
 * @param {EventTransport} eventTrans
 * @returns {Promise<EventResponse>}
 */
export async function eventRequest(eventTrans: EventTransport): Promise<any> {
	return new Promise((resolve, reject) => {
		const data = new FormData();
		const xhr = new XMLHttpRequest();

		data.append('type', eventTrans.event);
		data.append('payload', eventTrans.payload.body);

		xhr.onreadystatechange = function() {
			if (this.readyState === 4) {
				resolve(this.responseText);
			}
		};

		xhr.onerror = (error) => {
			reject(error);
		};

		xhr.open('POST', EVENT_PATH);
		console.log('event sending', eventTrans);
		xhr.send(data);
	});
}
