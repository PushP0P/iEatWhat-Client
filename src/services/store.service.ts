import { BehaviorSubject, Subject } from '@reactivex/rxjs';
import { MainComponentState } from '../models/main.model';
import { Action } from '../models/action.model';
import { Reducer } from '../models/reducer.model';

export const MAIN_STATE_INIT = {
	appReady: false
};

export class StoreService extends BehaviorSubject<MainComponentState> {
	private reducers: Map<string, Reducer> = new Map<string, Reducer>();

	public static initializeStore(): StoreService {
		return new StoreService(new Dispatcher());
	}

	public constructor(public dispatcher: Dispatcher) {
		super(MAIN_STATE_INIT);
	}

	public registerReducer(componentName: string, reducer: Reducer): void {
		this.reducers.set(componentName, reducer);
	}

}

class Dispatcher extends Subject<any> {

	public dispatch(action: Action): void {
		this.next(action);
	}

}
