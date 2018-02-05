import * as React from 'react';
import {FoodDetailsComponentProps, FoodDetailsComponentState, FoodIngredient} from '../../../models/food.model';
import {ReactElement} from 'react';
import {CommentsComponent} from '../../comments/comments.component';

export class FoodDetailsCompnent extends React.Component<FoodDetailsComponentProps, FoodDetailsComponentState> {

	constructor(public props: FoodDetailsComponentProps) {
		super(props);
	}

	public render(): ReactElement<HTMLDivElement> {
		return(
			<div
				className="food-details-component"
				style={{
					backgroundImage: this.props.backgroundURL
				}}
			>
				<div
					className="food-details_header"
				>
					<img src={`url(${this.props.foodPicURL}`} alt={`${this.state.foodDetails.foodName} picture`} />
					<h1>{this.state.foodDetails.foodName}</h1>
				</div>
				<div
					className="categories_box"
				>
					{this.state.foodDetails.categoryTags
						.map((tag: string) => {
							return(
								<CategoryComponent
									key={tag}
									tag={tag}
								/>
							);
						}
					)}
				</div>
				<DescriptionComponent
					name={this.state.foodDetails.foodName}
					isbn={this.state.foodDetails.isbn}
					type={this.state.foodDetails.description.foodGroup}
					updatedOn={this.state.foodDetails.lastUpdated}
					blurb={this.state.foodDetails.description.blurb}
				/>
				<IngredientsComponent
					ingredients={this.state.foodDetails.ingredients}
				/>
				<CommentsComponent viewId={this.props.foodId}/>
			</div>
		)
	}
}

interface CategoryComponentProps {
	tag: string;
}

const CategoryComponent = (props: CategoryComponentProps): ReactElement<HTMLDivElement> => {
	return(
		<div
			className="category-component"
		>
			<div
				className="category_icon"
			>
				ICON
			</div>
			<label>
				{props.tag}
			</label>
		</div>
	);
};

interface DescriptionComponentProps {
	name: string;
	isbn: string;
	type: string;
	updatedOn: number;
	blurb?: string;
}

const DescriptionComponent = (props: DescriptionComponentProps): ReactElement<HTMLDivElement> => {
	return(
		<div
			className="description-component"
		>
			<h2>Description</h2>
			<ul>
				<li>
					<span>
						<b>Name:</b>
						{props.name}
					</span>
				</li>
				<li>
					<span>
						<b>ISBN:</b>
						{props.isbn}
					</span>
				</li>
				<li>
					<span>
						<b>Type:</b>
						{props.type}
					</span>
				</li>
			</ul>
			<p>
				{props.blurb}
			</p>
		</div>
	);
};

interface IngredientsComponentProps {
	ingredients: FoodIngredient[]
}

const IngredientsComponent = (props: IngredientsComponentProps): ReactElement<HTMLDivElement> => {
	return(
		<div
			className="ingredients-component"
		>
			<h2>Ingredients</h2>
			<ul>
			{props.ingredients.map((ingredient: FoodIngredient) => {
				return(
					<li>
						{ingredient.name}
					</li>
				)
			})}
			</ul>
		</div>
	);
};


