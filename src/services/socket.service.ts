import * as SocketIO from 'socket.io-client';
import { EventResponse } from '../models/event-transport.model';
import { Observer, Observable } from '@reactivex/rxjs';
import { EventTransport } from '../models/event-transport.model';

// prod
// const socketIO: SocketIOClient.Socket = SocketIO('ec2-13-59-170-99.us-east-2.compute.amazonaws.com', {

const socketIO: SocketIOClient.Socket  = SocketIO('localhost:2820', {
	transports: ['socket', 'flash-socket'],
	secure: true
});

export async function transmitEvent(eventParcel: EventTransport): Promise<EventResponse> {
	return await Observable.create((observer: Observer<EventResponse>) => {
		socketIO.emit(eventParcel.event, eventParcel, (response: EventResponse) => {
			!response.ok ? observer.error(response) : observer.next(response);
			observer.complete();
		});
	}).toPromise();
}

