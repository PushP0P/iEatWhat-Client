import * as React from 'react';
import { MAIN_ROUTES_SWITCH } from '../../router/main.routes';
import { MAIN_COMPONENT_STATE_INIT, MainComponentProps, MainComponentState } from '../../models/main.model';
import { MasterState } from '../../services/store.service';
import { mainReducer } from './main.reducer';

export class MainComponent extends React.Component<MainComponentProps, MasterState> {
	public state: MainComponentState = MAIN_COMPONENT_STATE_INIT;

	private stateSubscribe = this.props.store
		.registerStore$(mainReducer, MAIN_COMPONENT_STATE_INIT)
		.subscribe((res: MasterState) => {
			this.setState(res);
		});

	public componentWillUnmount(): void {
		this.stateSubscribe.unsubscribe();
	}

	public render() {
		return MAIN_ROUTES_SWITCH(this.props.store);
	}
}
