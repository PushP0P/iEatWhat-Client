import { BehaviorSubject, Subject } from '@reactivex/rxjs';
import { MAIN_COMPONENT_STATE_INIT } from '../models/main.model';
import { Action } from '../models/action.model';
import { Reducer } from '../models/reducer.model';

interface MasterState {
	[stateProps: string]: any;
}

class Dispatcher extends Subject<any> {
	public dispatch(action: Action): void {
		this.next(action);
	}
}

export class StoreService extends BehaviorSubject<MasterState> {
	private reducers: Map<string, Reducer> = new Map<string, Reducer>();

	public static initializeStore(): StoreService {
		return new StoreService(new Dispatcher());
	}

	public constructor(public dispatcher: Dispatcher) {
		super(MAIN_COMPONENT_STATE_INIT);
	}

	public registerReducer(componentName: string, reducer: Reducer): void {
		this.reducers.set(componentName, reducer);
	}
}
