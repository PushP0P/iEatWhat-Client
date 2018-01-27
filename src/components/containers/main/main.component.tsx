import * as React from 'react';
import { MAIN_ROUTES_SWITCH } from  '../../../router/main.routes';
import { MainComponentProps, MainComponentState } from '../../../models/main.model';

export class MainComponent extends React.Component<MainComponentProps, MainComponentState> {

	constructor(public props: MainComponentProps) {
		super(props);
	}

	public render() {
		return MAIN_ROUTES_SWITCH();
	}
}
