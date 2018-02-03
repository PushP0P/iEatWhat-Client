import * as React from 'react';
import { MAIN_ROUTES_SWITCH } from  '../../../router/main.routes';
import { MainComponentProps, MainComponentState } from '../../../models/main.model';
import { httpRequest } from '../../../services/rest-service';

export class MainComponent extends React.Component<MainComponentProps, MainComponentState> {

	constructor(public props: MainComponentProps) {
		super(props);
	}

	public async componentDidMount(): Promise<void> {
		const response: {} = await httpRequest('//localhost:5000/json');
		console.log('Response', response );
	}

	public render() {
		return MAIN_ROUTES_SWITCH();
	}
}
