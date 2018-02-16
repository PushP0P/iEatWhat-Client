import * as React from 'react';
import { ReactElement } from 'react';
import { Subscription } from '@reactivex/rxjs';
import { LoadingComponent } from '../loading/loading.component';
import { SearchBarComponent } from '../reusable/search-bar/search-bar.component';
import { LandingComponentState } from '../../models/landing.model';
import { LANDING_STATE_INIT, LandingComponentProps } from '../../models/landing.model';
import { USDAReport } from '../../models/usda.model';
import { USDASearchResult } from '../../models/usda-food.model';
import { searchUSDA } from '../../services/search.service';
import { landingReducer } from './landing.reducer';
import { actionSelectItem } from './landing.actions';
import { actionDataReady } from '../main/main.actions';
import { actionShowResults } from './landing.actions';
import { USDASearchResponse } from '../../models/usda-food.model';
import { SearchResultsComponent } from '../search/search-result.controlled';

/**
 *  FIXTURES - Placeholders
 */
export const NavbarComponent = () => <div>NAVBAR PLACEHOLDER</div>;
export const FooterComponent = () => <div>FOOTER PLACEHOLDER</div>;

export class LandingComponent extends React.Component<LandingComponentProps, LandingComponentState> {
	public state: LandingComponentState = LANDING_STATE_INIT;
	private searchInput: string = '';
	private stateSubscription: Subscription;
	// private inputChangeSource: BehaviorSubject<string> = new BehaviorSubject<string>('');

	constructor(public props: LandingComponentProps) {
		super(props);
		this.foodItemSelectHandler = this.foodItemSelectHandler.bind(this);
		this.queryHandler = this.queryHandler.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleStateChange = this.handleStateChange.bind(this);
	}

	public componentDidMount(): void {
		this.stateSubscription = this.props.store
			.registerStore$(landingReducer, LANDING_STATE_INIT)
			.subscribe(this.handleStateChange);
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
					<SearchResultsComponent
						searchResults={this.state.searchResults || []}
						itemSelectHandler={this.foodItemSelectHandler}
						visible={this.state.searchResultsVisible}
					/>
					<FooterComponent />
				</div>
			) : (
				<LoadingComponent
					visible={!this.state.dataReady}
				/>
			);
	}

	private handleStateChange(state: LandingComponentState): void {
		this.setState(state);
	}

	private handleInputChange(value: string) {
		this.searchInput = value;
	}

	private async queryHandler(): Promise<void> {
		const searchResult: USDASearchResponse = await searchUSDA({
			requestType: 'search',
			params: {
				search_terms: this.searchInput
			}
		});
		this.props.store.dispatch(actionShowResults(searchResult.list.item));
	}

	private async foodItemSelectHandler(ndbno: string): Promise<void> {
		const food: USDASearchResult  = await searchUSDA({
			requestType: 'food',
			params: {
				ndbno: [ndbno],
				type: 'f',
				format: 'JSON'
			},
		});

		this.props.store
			.dispatch(actionSelectItem(food as USDAReport));
	}
}
