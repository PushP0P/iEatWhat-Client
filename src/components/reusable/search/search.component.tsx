import * as React from 'react';
import { Subscription } from '@reactivex/rxjs';
import { SearchComponentProps } from '../../../models/search.model';
import { SearchComponentState } from '../../../models/search.model';
import { SEARCH_STATE_INIT } from '../../../models/search.model';
import { ReactElement } from 'react';
import { SearchResultsComponent } from './search-result.controlled';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { searchUSDA } from '../../../services/search.service';
import { searchReducer } from './search.reducer';
import { USDAItem } from '../../../models/usda/usda-food.model';

export class SearchComponent extends React.Component<SearchComponentProps, SearchComponentState> {
	public state: SearchComponentState = SEARCH_STATE_INIT;
	private results: USDAItem[] = [];
	private searchInput: string = '';
	private subscriptions: Subscription;

	constructor(public props: SearchComponentProps) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	public render(): ReactElement<HTMLDivElement> {
		return (
			<div
				className="search-component"
			>
				<SearchBarComponent
					onQuery={this.queryHandler}
					onInputChange={this.handleInputChange}
				/>
				<SearchResultsComponent
					items={this.results}
					dispatch={this.props.store.dispatch}
					selectHandler={this.foodItemSelectHandler}
					visible={this.state.resultsVisible}
					pageNumber={this.state.resultsPage}
				/>
			</div>
		);
	}

	public componentDidMount(): void {
		this.subscriptions = this.props.store
			.registerStore$(searchReducer, SEARCH_STATE_INIT)
			.subscribe((state: SearchComponentState) => {
				this.setState(state);
			});
	}

	public componentWillUnmount(): void {
		this.subscriptions.unsubscribe();
	}

	private handleInputChange(inputVal: string): void {
		this.searchInput = inputVal;
	}

	private async queryHandler(): Promise<void> {
		const result = await searchUSDA({
			params: {
				search_terms: this.searchInput
			},
			requestType: 'search'
		});
		if (!result) {
			// handle nothing found
		}
		console.log('results?', result);
		// pagination
		this.results = result.list.item.slice(this.state.resultsPage, this.state.resultsPage + this.state.searchItemsPerPage);
	}

	private foodItemSelectHandler(ndbno: string): any {
		this.props.routes.history.push('food-details/' + ndbno);
	}
}
