import * as React from 'react';
import { MAIN_ROUTES_SWITCH } from '../../router/main.routes';
import { MAIN_COMPONENT_STATE_INIT, MainComponentProps, MainComponentState } from '../../models/components/main.model';
import { mainReducer } from './main.reducer';
import { Subscription } from '@reactivex/rxjs';

export class MainComponent extends React.Component<MainComponentProps, MainComponentState> {
	public state: MainComponentState = MAIN_COMPONENT_STATE_INIT;

	private stateSubscribe: Subscription;

	public componentDidMount(): void {
		this.stateSubscribe = this.props.store
			.registerStore$(mainReducer, MAIN_COMPONENT_STATE_INIT)
			.subscribe((res: MainComponentState) => {
				this.setState(res);
			});
	}

	public componentWillUnmount(): void {
		this.stateSubscribe.unsubscribe();
	}

	public render() {
		return MAIN_ROUTES_SWITCH(this.props.store);
	}
}
