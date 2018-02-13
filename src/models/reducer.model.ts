import { Action } from './action.model';

export declare type Reducer = ( <T> (action: Action, state: T) => T);
