import * as React from 'react';
import {ReactElement, SyntheticEvent} from 'react';
import { SearchBarComponent } from '../reusable/search-bar/search-bar.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import {LandingComponentProps, LandingComponentState} from '../../models/landing.model';

/**
 *  FIXTURES - Placeholders
 */
export const NavbarComponent = () => <div>NAVBAR PLACEHOLDER</div>;
export const FooterComponent = () => <div>FOOTER PLACEHOLDER</div>;
export const SearchResultsComponent = (props: any) => <div>SEARCH RESULTS PLACEHOLDER</div>;

export class LandingComponent extends React.Component<LandingComponentProps, LandingComponentState> {

	constructor(public props: any) {
		super(props);
		this.foodItemSelectHandler = this.foodItemSelectHandler.bind(this);
		this.searchHandler = this.searchHandler.bind(this);
	}

	public componentDidMount(): void {
		addEventListener('onKeyUp', (evt: KeyboardEvent) => {
			evt.preventDefault();
			if (evt.key)
			this.searchHandler(evt)
		});
	}

	public render(): ReactElement<HTMLDivElement> {
		return (
			<div
				className="landing-component container"
			>
				<NavbarComponent />
				<SearchBarComponent
					onQuery={this.searchHandler}
				/>
				<SearchResultsComponent
					onItemSelect={this.foodItemSelectHandler}
				/>
				<FooterComponent />
				<DashboardComponent />
			</div>
		);
	}

	private searchHandler(evt: SyntheticEvent<HTMLInputElement>): void {
		this.setState({
			query: (evt.target as any).value
		});
	}

	private foodItemSelectHandler(evt: Event, foodItemId: string): void {

	}
}
