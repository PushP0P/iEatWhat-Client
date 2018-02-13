import * as React from 'react';
import { ReactElement } from 'react';
import { SearchBarComponent } from '../reusable/search-bar/search-bar.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LANDING_STATE_INIT, LandingComponentProps } from '../../models/landing.model';
import { Subscription } from '@reactivex/rxjs';
import { queryFood, transformInputValToQuery } from '../../services/search.service';
import { landingReducer } from './landing.reducer';
import { MasterState } from '../../services/store.service';
import { actionSelectItem, actionShowResults } from './landing.actions';

/**
 *  FIXTURES - Placeholders
 */
export const NavbarComponent = () => <div>NAVBAR PLACEHOLDER</div>;
export const FooterComponent = () => <div>FOOTER PLACEHOLDER</div>;
export const SearchResultsComponent = (props: any) => {
	const style = props.visible ? {} : {display: 'none'};
	return (
		<div
			style={{...style}}
		>
			SEARCH RESULTS PLACEHOLDER
		</div>
	);
};

export class LandingComponent extends React.Component<LandingComponentProps, MasterState> {
	private searchValue: string = '';
	private stateSubscription: Subscription = this.props.store.registerStore$(landingReducer, LANDING_STATE_INIT)
		.subscribe((state: MasterState) => {
			this.setState(state);
			self.addEventListener('onkeyup', (evt: KeyboardEvent) => {
				evt.preventDefault();
				if (evt.key) {
					this.queryHandler();
				}
			});
		});

	constructor(public props: LandingComponentProps) {
		super(props);
		this.foodItemSelectHandler = this.foodItemSelectHandler.bind(this);
		this.queryHandler = this.queryHandler.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	public componentWillUnmount(): void {
		this.stateSubscription.unsubscribe();
	}

	public render(): ReactElement<HTMLDivElement> {
		return (
			<div
				className="landing-component container"
			>
				<NavbarComponent />
				<SearchBarComponent
					onQuery={this.queryHandler}
					onInputChange={this.handleInputChange}
				/>
				{this.state.searchResultsVisible
					? <SearchResultsComponent
						searchResults={this.state.searchResults}
						onItemSelect={this.foodItemSelectHandler}
						visible={this.state.searchResultsVisible}
					/>
						: <div/>
				}
				<FooterComponent />
				<DashboardComponent />
			</div>
		);
	}

	private handleInputChange(searchValue: string): void {
		this.searchValue = searchValue;
	}

	private async queryHandler(): Promise<void> {
		const searchResult = await queryFood({
			queries: transformInputValToQuery(this.searchValue),
			requestType: 'search'
		});
		this.props.store.dispatch(actionShowResults(searchResult));
	}

	private async foodItemSelectHandler(evt: Event, foodItemId: string): Promise<void> {
		this.props.store.dispatch(actionSelectItem(this.state.searchResults[foodItemId]));
	}
}
