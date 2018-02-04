import * as React from 'react';
import { ReactElement } from 'react';
import { SearchBarComponent } from '../search-bar/search-bar.component';

/**
 *  FIXTURES - Placeholders
 */
export const NavbarComponent = () => <div>NAVBAR</div>;
export const FooterComponent = () => <div>FOOTER</div>;

export class LandingComponent extends React.Component<any, any> {

	constructor(public props: any) {
		super(props);
	}

	public render(): ReactElement<HTMLDivElement> {
		return (
			<div
				className="landing-component container"
			>
				<NavbarComponent />
				<div
					className="search-area row"
				>
					<SearchBarComponent />
				</div>
				<div
					className="row"
				>
					<div
						className="col-sm-12"
					>
						SEARCH RESULT PLACEHOLDER
					</div>
				</div>
				<FooterComponent />
			</div>
		);
	}
}
