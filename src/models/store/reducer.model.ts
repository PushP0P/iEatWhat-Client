import { Action } from './action.model';

export declare type Reducer = (action: Action, state: {[prop: string]: any }) => { [prop: string]: any };
