import * as React from 'react';
import { MAIN_ROUTES_SWITCH } from '../../router/main.routes';
import { MainComponentProps, MainComponentState } from '../../models/main.model';
import { MAIN_STATE_INIT, StoreService } from '../../services/store.service';

export class MainComponent extends React.Component<MainComponentProps, MainComponentState> {
	public state = MAIN_STATE_INIT;
	private store: StoreService = StoreService.initializeStore();

	public render() {
		return MAIN_ROUTES_SWITCH(this.store);
	}
}
