/* tslint:disable */
import * as React from 'react';
import { CommentsListProps, CommentsListState, generateDemoComment } from '../../../models/comments.model';
import * as renderer from 'react-test-renderer';
import { CommentsListContainer } from './comments-list.container';

/**
 * Testing
 * Set up dummy data.
 */
const FIXTURE_COMMENTS_LIST_STATE: CommentsListState = {
	testComment0: {
		comment: generateDemoComment(),
	},
	testComment1: {
		comment: generateDemoComment(),
		repliesListId: 'replies0'
	},
	testComment2: {
		comment: generateDemoComment()
	}
};
const FIXTURE_COMMENTS_LIST_PROPS: CommentsListProps = {
	id: 'testList0',
	viewId: 'testView'
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
 * Testing
 * Write tests :)
 */
it(
	`Should have viewId for comment data services`,
	() => {
		expect(
			component.toTree().props.viewId
		)
			.toBe(FIXTURE_COMMENTS_LIST_PROPS.viewId);
	}
);

it(
	`Should display ${Object.keys(FIXTURE_COMMENTS_LIST_STATE).length} comments.`,
	() => {
		expect(
			Object
				.keys(component.toTree().instance.state).length
		)
			.toBe(Object
			.keys(FIXTURE_COMMENTS_LIST_STATE).length);
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

// Blocked until we strategize user resolutions
// it(
// 	`Should have a true editable prop if userId matches comment's user_id.`,
// 	() => {
// 		expect(
// 			() => {
// 				const comments: ReactElement<any>[] = component.toTree().instance.state;
//
// 				for (let comment of comments) {
// 					if (comment.props.userId === userId && !comment.props.editable) {
// 						return false;
// 					} else if (comment.props.editable) {
// 						return false;
// 					}
// 				}
// 				return true;
// 			}
// 		).toBe(true);
// 	}
// );
