import * as React from 'react';
import { MAIN_ROUTES_SWITCH } from '../../router/main.routes';
import { MAIN_COMPONENT_STATE_INIT, MainComponentProps, MainComponentState } from '../../models/main.model';
import { StoreService } from '../../services/store.service';

export class MainComponent extends React.Component<MainComponentProps, MainComponentState> {
	public state: MainComponentState = MAIN_COMPONENT_STATE_INIT;
	private store: StoreService = StoreService.initializeStore();
	public render() {
		return MAIN_ROUTES_SWITCH(this.store);
	}
}
