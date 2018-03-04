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
					<li><Link to={'#'}>About</Link></li>
					<li><Link to={'#'}>FAQ</Link></li>
					<li><Link to={'#'}>Data Use</Link></li>
					<li><Link to={'#'}>Privacy and Security</Link></li>
					<li><Link to={'#'}>Contact Us</Link></li>
				</ul>
			</footer>);
	}
}