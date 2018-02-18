import * as React from 'react';
import {
	FOOD_DETAILS_STATE_INIT, FoodDetailsComponentProps,
	FoodDetailsComponentState
} from '../../../models/food.model';
import { ReactElement } from 'react';
import { CommentsComponent } from '../../comments/comments.component';
import { VotingComponent } from '../../reusable/voting/voting.component';
import { CategoryComponent } from '../../reusable/categories/category.controlled';
import { IngredientsComponent } from './igredients.controlled';
import { DescriptionComponent } from './description.controlled';
import { foodDetailsReducer } from './food-details.reducer';
import { actionUpdateFoodDetails } from './food-details.actions';
import { searchUSDA } from '../../../services/search.service';
import { ReportOptions } from '../../../models/usda/usda.model';
import { USDAReport } from '../../../models/usda/usda.model';
import { Subscription } from '@reactivex/rxjs';

export class FoodDetailsComponent extends React.Component<FoodDetailsComponentProps, FoodDetailsComponentState> {
	public state = FOOD_DETAILS_STATE_INIT;
	private subscriptions: Subscription;

	public async componentDidMount(): Promise<void> {
		this.subscriptions = this.props.store.registerStore$(foodDetailsReducer, this.state)
			.subscribe((state: FoodDetailsComponentState) => {
				this.setState(state);
			});
		const details: USDAReport = await searchUSDA (
			{
				params: {
					ndbno: [this.props.foodId]
				} as ReportOptions,
				requestType: 'food'
			}
		) as USDAReport;
		if (details) {
			this.props.store.dispatch(actionUpdateFoodDetails(details));
		}
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
								className="header_image_box"
							>
								<img
									src={this.state.foodDetails.imageURL}
									alt={`${this.state.foodDetails.name} picture`}
								/>
							</div>
							<h1>{this.state.foodDetails.name}</h1>
						</div>
						<div
							className="categories_box"
						>
							{this.state.foodDetails.categoryTags
								.map((tag: string) => {
										return (
											<CategoryComponent
												key={tag}
												tag={tag}
											/>
										);
									}
								)}
						</div>
						<hr />
						<DescriptionComponent
							name={this.state.foodDetails.name}
							isbn={this.state.foodDetails.ndbno}
							type={this.state.foodDetails.group}
							updatedOn={this.state.foodDetails.lastUpdated}
						/>
						<hr />
						<IngredientsComponent
							// TODO
							ingredients={[]}
						/>
						<hr />
						<CommentsComponent viewId={this.props.foodId}/>
						<hr />
						<VotingComponent/>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					Loading Data .......
				</div>
			);
		}
	}
}
