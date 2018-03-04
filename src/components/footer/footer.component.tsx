import * as React from 'react';
import {
	FOOTER_COMPONENT_STATE_INIT, FooterComponentProps,
	FooterComponentState
} from '../../models/components/footer.model';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export class FooterComponent extends React.Component<FooterComponentProps, FooterComponentState> {
	constructor(public props: FooterComponentProps) {
		super(props);
		this.state = FOOTER_COMPONENT_STATE_INIT;
	}

	public render(): ReactElement<HTMLDivElement> {
		return (
			<footer>
				<ul>
					<li><Link to={'#'}>Link 1</Link></li>
					<li><Link to={'#'}>Link 2</Link></li>
					<li><Link to={'#'}>Link 3</Link></li>
					<li><Link to={'#'}>Link 4</Link></li>
				</ul>
			</footer>);
	}
}