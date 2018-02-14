import * as React from 'react';
import { ReactElement } from 'react';
import { SearchBarComponent } from '../reusable/search-bar/search-bar.component';
import { LANDING_STATE_INIT, LandingComponentProps } from '../../models/landing.model';
import { Subscription } from '@reactivex/rxjs';
import { queryFood, transformInputValToQuery } from '../../services/search.service';
import { landingReducer } from './landing.reducer';
import { actionSelectItem, actionShowResults } from './landing.actions';
import { LoadingComponent } from '../loading/loading.component';
import { LandingComponentState } from '../../models/landing.model';
import { actionDataReady } from '../main/main.actions';

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

export class LandingComponent extends React.Component<LandingComponentProps, LandingComponentState> {
	public state = LANDING_STATE_INIT;
	private stateSubscription: Subscription;

	constructor(public props: LandingComponentProps) {
		super(props);

		this.foodItemSelectHandler = this.foodItemSelectHandler.bind(this);
		this.queryHandler = this.queryHandler.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	public componentDidMount(): void {
		this.stateSubscription = this.props.store.registerStore$(landingReducer, LANDING_STATE_INIT)
			.subscribe((state: LandingComponentState) => {
				this.setState(state);

			});
		this.props.store.dispatch(actionDataReady());
	}

	public componentWillUnmount(): void {
		this.stateSubscription.unsubscribe();
	}

	public render(): ReactElement<HTMLDivElement> {
		return this.state.dataReady
			? (
				<div
					className="landing-component container"
				>
					<NavbarComponent />
					<SearchBarComponent
						onQuery={this.queryHandler}
						onInputChange={this.handleInputChange}
					/>
					{this.state.searchResultsVisible
						? (
							<SearchResultsComponent
								searchResults={this.state.searchResults}
								onItemSelect={this.foodItemSelectHandler}
								visible={this.state.searchResultsVisible}
							/>
						) : (
							<div>
								LOADING
							</div>
					)}
					<FooterComponent />
				</div>
			) : (
				<LoadingComponent
					visible={!this.state.dataReady}
				/>
			);
	}

	private handleInputChange(searchValue: string): void {
		this.state.searchValue = searchValue;
	}

	private async queryHandler(): Promise<void> {
		const searchResult = await queryFood({
			queries: transformInputValToQuery(this.state.searchValue),
			requestType: 'search'
		});
		this.props.store.dispatch(actionShowResults(searchResult));
	}

	private async foodItemSelectHandler(
		evt: Event,
		foodItemId: string): Promise<void> {
		this.props.store
			.dispatch(actionSelectItem(this.state.searchResults[foodItemId]));
	}
}
