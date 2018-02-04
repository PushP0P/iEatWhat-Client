// // tslint:disable
// // import * as React from 'react';
// import * as Enzyme from 'enzyme';
// import * as Adapter from 'enzyme-adapter-react-16';
import { CommentsListProps, CommentsListState, generateDemoComment } from '../../../models/comments.model';
// // import { shallow } from 'enzyme';
// import { ReactElement } from 'react';
// // import { CommentsListContainer } from './comments-list.container';
//
// Enzyme.configure({ adapter: new Adapter() });
//
// /**
//  * Testing
//  * Set up dummy data.
//  */
export const FIXTURE_COMMENTS_LIST_STATE: CommentsListState = {
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
export const FIXTURE_COMMENTS_LIST_PROPS: CommentsListProps = {
	id: 'testList0',
	viewId: 'testView'
};
export const FIXTURE_REPLY_LIST_PROPS: CommentsListProps = {
	id: 'testReplyList0',
	viewId: 'testView',
	owningCommentId: 'testComment1'
};
// const userId = FIXTURE_COMMENTS_LIST_STATE[Object.keys(FIXTURE_COMMENTS_LIST_STATE)[0]].comment.userId;
//
// /**
//  * Testing
//  * Get component(s) to test.
//  */
// const wrapper = {} as any;
// 	// shallow(
// 	{/*<CommentsListContainer*/}
// 		// {...FIXTURE_COMMENTS_LIST_PROPS}
// 	// />
// // );
//
// /**
//  * Testing
//  * Write tests :)
//  */
// it(
// 	`Make a request for comment data with a view id`,
// 	() => {
// 		expect(wrapper
// 			.state().viewId)
// 			.toBe(FIXTURE_COMMENTS_LIST_PROPS.viewId);
//
// 		expect(Object
// 			.keys(wrapper.prop('comments')).length)
// 			.toBeGreaterThan(0);
// 	}
// );
//
// it(
// 	`Should display ${Object.keys(FIXTURE_COMMENTS_LIST_STATE).length} comments.`,
// 	() => {
// 		expect(wrapper
// 			.find('comments-list')
// 			.children.length)
// 			.toBe(Object
// 				.keys(FIXTURE_COMMENTS_LIST_STATE).length);
// 	}
// );
//
// it(
// 	`Should render comments in order by latest to oldest`,
// 	() => {
// 		expect(() => {
// 			const currentCommentOrder: ReactElement<any>[] = wrapper
// 				.find('comments-list')
// 				.getNodes();
// 			let lastDate = currentCommentOrder[0].props.createDate;
//
// 			for (let comment of currentCommentOrder) {
// 				if (lastDate < comment.props.createDate) {
// 					return false;
// 				}
// 				lastDate = comment.props.createDate;
// 			}
// 			return true;
// 		}).toBe(true);
// 	}
// );
//
// it(
// 	`Should have a true editable prop if userId matches comment's user_id.`,
// 	() => {
// 		expect(
// 			() => {
// 				const comments: ReactElement<any>[] = wrapper
// 					.find('comments-list')
// 					.getNodes();
//
// 				for (let comment of comments) {
// 					// noinspection TypeScriptUnresolvedVariable
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
//
// // it(
// // 	`Should send a comment edited event to the server when editable div is blurred.`,
// // 	() => {
// //
// // 	}
// // );
