import * as React from 'react';
import {ReactElement} from 'react';
import {CommentsComponentProps, CommentsComponentState} from '../../models/comments.model';

export class CommentsComponent extends React.Component<CommentsComponentProps, CommentsComponentState> {

	constructor(public props: CommentsComponentProps) {
		super(props);
		this.state = {
			testFooBar: 'loading',
			comments: {}
		}
	}

	public componentDidMount(): void {
		this.setState({testFooBar: 'BAT METAL!'})
	}

	public render(): ReactElement<HTMLDivElement> {
		return(
			<div
				className={"comments-component " + this.state.testFooBar}
			>

			</div>
		);
	}
}
