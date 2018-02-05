/* tslint:disable */
import * as React from 'react';
import {
	CommentProps,
	CommentsList, CommentsListProps, CommentsListState,
	generateDemoComment
} from '../../../models/comments.model';
import * as renderer from 'react-test-renderer';
import { CommentsListContainer } from './comments-list.container';

/**
 * Testing
 * Set up dummy data.
 */
const FIXTURE_COMMENTS_LIST_PROPS: CommentsListProps = {
	containerId: 'testList0',
	topic: 'testView'
};

const FIXTURE_COMMENTS_LIST: CommentsList = {
	testComment0: generateDemoComment(),
	testComment1: generateDemoComment(),
	testComment2: generateDemoComment(),
};
/**
 * Testing
 * Get component(s) to test.
 */
const component: any = renderer.create(
	<CommentsListContainer
		{...FIXTURE_COMMENTS_LIST_PROPS}
	/>
);

/**
 * Stubbing Component Service
 */
component.componentDidMount = function(){
	this.setState({
		comments: FIXTURE_COMMENTS_LIST,
		dataReady: true
	});
};
/**
 * Testing
 * Write tests :)
 */
it(
	`Should have viewId for comment data services`,
	() => {
		expect(
			component.toTree().props.topic
		)
			.toBe(FIXTURE_COMMENTS_LIST_PROPS.topic);
	}
);

it(
	`Should display ${Object.keys(FIXTURE_COMMENTS_LIST).length} comments.`,
	() => {
		expect(
			Object
				.keys(component
					.toTree().instance.state).length
		)
			.toBe(Object
			.keys(FIXTURE_COMMENTS_LIST).length);
	}
);

it(
	`Should render comments in order by latest to oldest`,
	() => {
		expect(testDates()).toBeTruthy();

		function testDates(): boolean {
			const currentCommentOrder = Object
				.keys(component.toTree().instance.state)
				.map(key => component.toTree().instance.state[key]);
			let lastDate = currentCommentOrder[0].create_date;

			for (let comment of currentCommentOrder) {
				if (lastDate < comment.create_date) {
					return false;
				}
				lastDate = comment.create_date;
			}
			return true;
		}
	}
);

it(
	`Should have a true editable prop if userId matches comment's user_id.`,
	() => {
		expect(
			() => {
				const comments: CommentsListState = component
					.toTree().instance.state;
				const commentsArray: CommentProps[] = Object
					.keys(comments)
					.map(key => {
						return comments[key].comment;
				});
				const userId = commentsArray[1].userId;

				for (let comment of commentsArray) {
					if (comment.userId === userId && !comment.editable) {
						return false;
					} else if (comment.editable) {
						return false;
					}
				}
				return true;
			}
		).toBe(true);
	}
);
