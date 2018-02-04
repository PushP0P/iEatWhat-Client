import * as React from 'react';
import { Link } from 'react-router-dom';
import { CommentsComponent } from '../comments/comments.component';
import { CommentsListState } from '../../models/comments.model';

export class LandingComponent extends React.Component {
	// tslint:disable
	constructor(public props: any) {
		super(props);
	}
	public render() {
		return(
			<div
				className="landing-component container"
			>
				<h1>Landing Component</h1>

				TODO...

				<Link to={'/sign-in'}>Sign In</Link>
				<CommentsComponent
					viewId={'foo'}
					getComments={() => {
						return {} as CommentsListState
					}}
					editHandler={() => {
						return {};
				}} />
			</div>
		);
	}
}
