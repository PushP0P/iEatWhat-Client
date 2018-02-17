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
import { Observable } from '@reactivex/rxjs';
import { Subject } from '@reactivex/rxjs';
import { actionShowResults } from './search.actions';

export class SearchComponent extends React.Component<SearchComponentProps, SearchComponentState> {
	public state: SearchComponentState = SEARCH_STATE_INIT;
	private searchInputSource: Subject<string> = new Subject<string>();
	private enterInputSource: Subject<string> = new Subject<string>();
	private inputChanged$: Observable<string> = this
		.enterInputSource
		.merge(this.searchInputSource.debounce(() => Observable.interval(3000)))
		.distinctUntilChanged();
	private results: USDAItem[] = [];
	private subscriptions: Subscription;

	public render(): ReactElement<HTMLDivElement> {
		return (
			<div
				className="search-component"
			>
				<SearchBarComponent
					handleInputChange={this.searchInputSource}
					handleEnterPress={this.enterInputSource}
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
		this.subscriptions
			.add(this.inputChanged$.subscribe((searchTerm: string) => {
				this.makeQuery(searchTerm);
			}));
	}

	public componentWillUnmount(): void {
		this.subscriptions.unsubscribe();
	}

	private async makeQuery(searchTerm: string): Promise<void> {
		const result = await searchUSDA({
			params: {
				search_terms: searchTerm
			},
			requestType: 'search'
		});
		if (!result) {
			// handle nothing found
		}
		// pagination
		if ('errors' in result) {
			return;
		}
		this.results = await result.list.item;
		this.props.store.dispatch(actionShowResults());
	}

	private foodItemSelectHandler(ndbno: string): any {
		this.props.routes.history.push('food-details/' + ndbno);
	}
}
