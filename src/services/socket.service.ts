import * as IO from 'socket.io-client';
import Socket = SocketIOClient.Socket;
import { EventResponse } from '../models/event-transport.model';
import { Observer, Observable } from '@reactivex/rxjs';
import { EventTransport } from '../models/event-transport.model';

// prod
// const socketIO: SocketIOClient.Socket = SocketIO('ec2-13-59-170-99.us-east-2.compute.amazonaws.com', {

const socketIO: Socket = IO('localhost:2820', {
	transports: ['websocket'],
	secure: true
});

export async function transmitEvent(eventParcel: EventTransport): Promise<EventResponse> {
	console.log('transmitting event', eventParcel);
	return await Observable.create((observer: Observer<EventResponse>) => {
		socketIO.emit(eventParcel.event, eventParcel, (response: EventResponse) => {
			console.log('Event Response', response);
			!response.ok ? observer.error(response) : observer.next(response);
			observer.complete();
		});
	}).toPromise();
}
