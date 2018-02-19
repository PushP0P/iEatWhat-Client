import * as React from 'react';
import {
	FOOD_DETAILS_STATE_INIT, FoodDetailsComponentProps,
	FoodDetailsComponentState
} from '../../../models/food.model';
import { ReactElement } from 'react';
import { Subscription } from '@reactivex/rxjs';
import { LoadingComponent } from '../../reusable/loading/loading.component';
import { VotingComponent } from '../../reusable/voting/voting.component';
import { CategoryComponent } from '../../reusable/categories/category.controlled';
import { IngredientsComponent } from './igredients.controlled';
import { DescriptionComponent } from './description.controlled';
import { foodDetailsReducer } from './food-details.reducer';
import { queryUSDA } from '../../../services/search.service';
import { actionDataReady } from '../../main/main.actions';
import { ReportFetchResponse } from '../../../models/usda/usda.model';
import { USDA_SEARCH_KEYS } from '../../../models/usda/usda.model';

export class FoodDetailsComponent extends React.Component<FoodDetailsComponentProps, FoodDetailsComponentState> {
	public state = FOOD_DETAILS_STATE_INIT;
	private subscriptions: Subscription;
	private content: any = {} as any;

	public async componentDidMount(): Promise<void> {
		this.subscriptions = this.props.store
			.registerStore$(foodDetailsReducer, this.state)
			.subscribe((state: FoodDetailsComponentState) => {
				this.setState(state);
			});
		const slug: string = this.props.routeComponentProps.match.params.id;

		const content: ReportFetchResponse = await queryUSDA({
			params: {
				[USDA_SEARCH_KEYS.ndbno]: slug,
				[USDA_SEARCH_KEYS.reportType]: 'f',
			},
			requestType: 'V2/reports'
		});

		this.content = content.foods[0];
		console.log('report', this.content.desc.);
		this.props.store.dispatch(actionDataReady());
	}

	public componentWillUnmount(): void {
		this.subscriptions.unsubscribe();
	}

	public render(): ReactElement<HTMLDivElement> {
		if (this.state.dataReady) {
			return (
				<div
					className="food-details-component"
				>
					<div
						className="content_wrapper"
					>
						<div
							className="food-details_header"
						>
							<div
								className="header_image-box"
							>
								<img
									src={this.content.desc.}
									alt={`${this.content.name} picture`}
								/>
							</div>
							<h1>{this.content}</h1>
						</div>
						<div
							className="categories_box"
						>
							{this.content.categories((tag: string) => {
										return (
											<CategoryComponent
												key={tag}
												tag={tag}
											/>
										);
								})}
						</div>
						<hr />
						<DescriptionComponent
							name={this.content.desc.ndb_food_number}
							upc={this.content.req}
							type={this.content.group}
							updatedOn={this.content.lastUpdated}
						/>
						<hr />
						<IngredientsComponent
							// TODO
							ingredients={[]}
						/>
						<hr />
						{/*<CommentsComponent viewId={this.content.desc.food_name}/>*/}
						<hr />
						<VotingComponent/>
					</div>
				</div>
			);
		} else {
			return (
				<LoadingComponent visible={this.state.dataReady}/>
			);
		}
	}
}
