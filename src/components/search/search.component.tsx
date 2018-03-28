import * as React from 'react';
import { ReactElement } from 'react';
import { Subscription } from '@reactivex/rxjs';
import { BehaviorSubject } from '@reactivex/rxjs';
import { SearchComponentProps } from '../../models/components/search.model';
import { SearchComponentState } from '../../models/components/search.model';
import { LoadingComponent } from '../reusable/loading/loading.component';
import { USDAItem } from '../../models/usda/usda-food.model';
import { SEARCH_STATE_INIT } from '../../models/components/search.model';
import { FoodProduct } from '../../models/food.model';
import { SearchBarComponent } from '../reusable/search-bar/search-bar.component';
import { SearchResultsComponent } from './search-results.list';
import { searchReducer } from './search.reducer';
import { SearchResult } from './search-result.component';
import { transmitEvent } from '../../services/socket.service';
import { actionHideResults } from './search.actions';
import { actionShowResults } from './search.actions';
import { getCategories } from '../../services/search.service';
import { actionInitCategories } from './search.actions';
import { actionToggleCategory } from './search.actions';

export class SearchComponent extends React.Component<SearchComponentProps, SearchComponentState> {
	public state: SearchComponentState = SEARCH_STATE_INIT;
	private searchTermSource: BehaviorSubject<string> = new BehaviorSubject<string>('');
	private results: FoodProduct[] = [];
	private subscriptions: Subscription;

	get getResultPage(): USDAItem[] {
		return this.results.length > 20 ? this.results.slice (0, 19) : this.results;
	}

	constructor(public props: SearchComponentProps) {
		super(props);
		this.foodItemSelectHandler = this.foodItemSelectHandler.bind(this);
		this.searchHandler = this.searchHandler.bind(this);
		this.searchByTerm = this.searchByTerm.bind(this);
		this.categorySelectHandler = this.categorySelectHandler.bind(this);
	}

	public render(): ReactElement<HTMLDivElement> {
		return (
			<div
				className="search-component"
			>
				<SearchBarComponent
					handleInputChange={this.searchTermSource}
					handleEnterPress={this.searchHandler}
					categories={this.state.categories}
					selectedCategories={this.state.selectedCategories}
					categorySelectHandler={this.categorySelectHandler}
				/>
				<div
					className="dropdown"
				>
					{this.getResultPage
						.map(
							(item: FoodProduct) => {
							return (
								<SearchResult
									key={item.ndbno.toString()}
									foodProduct={item}
									clickHandler={this.foodItemSelectHandler}
								/>
							);
						})
					}
				</div>
				{this.state.nowSearching
					? (
						<LoadingComponent
							visible={this.state.nowSearching}
						/>
					) : (
						<SearchResultsComponent
							products={this.results}
							dispatch={this.props.store.dispatch}
							selectHandler={this.foodItemSelectHandler}
							visible={!this.state.nowSearching}
							pageNumber={0}
							location={this.props.location.locationSource.value}
						/>
					)}
			</div>
		);
	}

	public componentDidMount(): void {
		this.subscriptions = this.props.store
			.registerStore$(searchReducer, SEARCH_STATE_INIT)
			.subscribe(
				(state: SearchComponentState) => {
				this.setState(state);
			});
		this.initCategories();
	}

	public componentWillUnmount(): void {
		this.subscriptions.unsubscribe ();
	}

	private initCategories(): void {
		const categories: string[] = getCategories();
		this.props.store.dispatch(actionInitCategories(categories));
	}

	private searchHandler(): void {
		this.searchByTerm(this.searchTermSource.value);
	}

	private async searchByTerm(term: string): Promise<void> {
		console.log('term search', term);
		await this.props.store.dispatch(actionHideResults());
		const result = await transmitEvent({
			event: 'SEARCH',
			payload: {
				type: 'PACKAGE_SEARCH',
				body: {
					term: term,
					categories: this.state.selectedCategories
				},
			}
		});
		if (result) {
			this.results = result.body;
			console.log('results', this.results);
			await this.props.store.dispatch(actionShowResults());
		}
	}

	private foodItemSelectHandler(ndbno: string): any {
		this.props.routes.history.push ('food-details/' + ndbno);
	}

	private categorySelectHandler(category: string): void {
		this.props.store.dispatch(actionToggleCategory(category));
	}
}
