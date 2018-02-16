import { BehaviorSubject, Observable } from '@reactivex/rxjs';
import { Action } from '../models/action.model';
import { Reducer } from '../models/reducer.model';

export interface MasterState {
	[stateProps: string]: any;
}

export class StoreService extends BehaviorSubject<MasterState> {
	public reducers: Set<Reducer> = new Set<Reducer>();

	constructor() {
		super({});
		console.log('calling store');
	}

	public registerStore$(
		reducer: Reducer,
		initialState: {
			[prop: string]: any
		}): Observable<MasterState> {
		console.log('hit register store');
		this.reducers.add(reducer);
		this.next({
			...this.value,
			...initialState
		});
		return this.asObservable();
	}

	public dispatch(action: Action): void {
		this.reducers
			.forEach((
				reducer: Reducer) => {
				const nextState = reducer(action, this.value);
				this.next(nextState);
			});
	}
}
