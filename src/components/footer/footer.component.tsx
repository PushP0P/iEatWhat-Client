import * as React from 'react';
import {
	FOOTER_COMPONENT_STATE_INIT, FooterComponentProps,
	FooterComponentState
} from '../../models/components/footer.model';
import { ReactElement } from 'react';

export class FooterComponent extends React.Component<FooterComponentProps, FooterComponentState> {
	constructor(public props: FooterComponentProps) {
		super(props);
		this.state = FOOTER_COMPONENT_STATE_INIT;
	}

	public render(): ReactElement<HTMLDivElement> {
		return (
			<footer>
				<a href="#">Link 1</a><br/>
				<a href="#">Link 2</a>
				<a href="#">Link 3</a>
				<a href="#">Link 4</a>
			</footer>);
	}
}