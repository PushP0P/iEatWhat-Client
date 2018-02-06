import * as React from 'react';
import { ReactElement } from 'react';
import { SearchBarComponent } from '../reusable/search-bar/search-bar.component';
import { FoodDetailsComponent } from '../food/food-details/food-details.compnent';

/**
 *  FIXTURES - Placeholders
 */
export const NavbarComponent = () => <div>NAVBAR PLACEHOLDER</div>;
export const FooterComponent = () => <div>FOOTER PLACEHOLDER</div>;
export const SearchResultsComponent = () => <div>SEARCH RESULTS PLACEHOLDER</div>;

export class LandingComponent extends React.Component<any, any> {

	constructor(public props: any) {
		super(props);
	}

	public render(): ReactElement<HTMLDivElement> {
		return (
			<div
				className="landing-component container"
			>
				<NavbarComponent />
				<div
					className="search-area row"
				>
					<SearchBarComponent />
				</div>
				<SearchResultsComponent />
				<FoodDetailsComponent
					backgroundURL={'https://static.pexels.com/photos/54455/cook-food-kitchen-eat-54455.jpeg'}
					foodId={'demoFood'}
					topic={'Test Food'}
				/>
				<FooterComponent />
			</div>
		);
	}
}
