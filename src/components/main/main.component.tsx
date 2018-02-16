import * as React from 'react';
import { MAIN_ROUTES_SWITCH } from '../../router/main.routes';
<<<<<<< HEAD
import { MAIN_COMPONENT_STATE_INIT, MainComponentProps, MainComponentState } from '../../models/main.model';
// import { mainReducer } from './main.reducer';
import { Subscription } from '@reactivex/rxjs';

export class MainComponent extends React.Component<MainComponentProps, MainComponentState> {
	public state: MainComponentState = MAIN_COMPONENT_STATE_INIT;
	private stateSubscribe: Subscription;

	public componentDidMount(): void {
		// this.stateSubscribe = this.props.store
		// 	.registerStore$(mainReducer, MAIN_COMPONENT_STATE_INIT)
		// 	.subscribe((res: MainComponentState) => {
		// 		console.log('registering reducer');
		// 		this.setState(res);
		// });
	}

	public componentWillUnmount(): void {
		this.stateSubscribe.unsubscribe();
=======
import { MainComponentProps, MainComponentState } from '../../models/main.model';

export class MainComponent extends React.Component<MainComponentProps, MainComponentState> {
	constructor(public props: MainComponentProps) {
		super(props);
>>>>>>> f43aadde671f71f64b2219346c26558d03d1637a
	}

	public render() {
		return MAIN_ROUTES_SWITCH(this.props.store);
	}
}
