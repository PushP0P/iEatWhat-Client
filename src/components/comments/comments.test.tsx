//tslint:disable
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {CommentsComponent} from './comments.container';
import {CommentsComponentProps, generateDemoComment} from '../../models/comments.model';
import {shallow} from 'enzyme';

const FIXTURE_COMMENTS_LIST = {
	testComment0: {
		comment: generateDemoComment(),
	},
	testComment1: {
		comment: generateDemoComment(),
		replies: {
			reply0: {
				comment: generateDemoComment()
			},
			reply1: {
				comment: generateDemoComment()
			}
		}
	},
	testComment2: {
		comment: generateDemoComment()
	}
};

const FIXTURE_COMMENTS_COMPONENT_PROPS: CommentsComponentProps = {
	view_id: 'testing_fixture',
	getComments(){
		return FIXTURE_COMMENTS_LIST;
	},
	editHandler(){}
};

const component = renderer.create(
	<CommentsComponent
		{...FIXTURE_COMMENTS_COMPONENT_PROPS}
	/>
);

const wrapper = shallow(
	<CommentsComponent
		{...FIXTURE_COMMENTS_COMPONENT_PROPS}
	/>
);

const tree = component.toJSON();
// console.log('Tree', tree);

it(
	`Make a request for comment data with a view id`,
	() => {
		expect(wrapper)
});

it(
	`Comment displays comment text`,
	async () => {
		// const instance = component.getInstance();
		console.log('instance', tree);


	}
);

//
// it(`Should render comments in order by latest to oldest`, () => {
//
// 	return false;
// });
//
// it(`Should check for user id`, () => {
//
//
// 	it('Edit and remove should be available only to the users comments.', () => {
//
// 		return false;
// 	});
//
// 	return false;
// });
//
// it(`Should send a comment edited event to the server when editable div is blurred.`, () => {
//
// });
