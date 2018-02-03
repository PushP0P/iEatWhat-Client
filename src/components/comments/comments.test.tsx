// tslint: disable
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { CommentsComponent } from './comments.container';
import { CommentsComponentProps, generateDemoComment } from '../../models/comments.model';
import { shallow } from 'enzyme';
import { ReactElement } from 'react';

Enzyme.configure({ adapter: new Adapter() });

/**
 * Testing
 * Set up dummy data.
 */
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
const userId = FIXTURE_COMMENTS_LIST[Object.keys(FIXTURE_COMMENTS_LIST)[0]].user_id;
const FIXTURE_COMMENTS_COMPONENT_PROPS: CommentsComponentProps = {
	view_id: 'testing_fixture',
	getComments(){
		return FIXTURE_COMMENTS_LIST;
	},
	editHandler(){}
};

/**
 * Testing
 * Get component(s) to test.
 */
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

const tree: any = component.toJSON();
console.log('Tree', tree.props);


/**
 * Testing
 * Write tests :)
 */
it(
	`Make a request for comment data with a view id`,
	() => {
		expect(wrapper
			.state().view_id)
			.toBe(FIXTURE_COMMENTS_COMPONENT_PROPS.view_id);

		expect(Object
			.keys(wrapper.prop('comments')).length)
			.toBeGreaterThan(0);
});

it(
	`Should display ${Object.keys(FIXTURE_COMMENTS_LIST).length} comments.`,
	() => {
		expect(wrapper
			.find('comments-list')
			.children.length)
			.toBe(Object
				.keys(FIXTURE_COMMENTS_LIST).length)
	}
);

it(
	`Should render comments in order by latest to oldest`,
	() => {
		expect(() => {
			const currentCommentOrder: ReactElement<CommentComponent>[] = wrapper
				.find('comments-list')
				.getNodes();
			let lastDate = currentCommentOrder[0].props.date;

			for (let comment of currentCommentOrder) {
				if (lastDate < comment.props.create_date) {
					return false;
				}
				lastDate = comment.props.create_date;
			}
			return true;
		}).toBe(true)
	}
);

it(
	`Should have a true editable prop if userId matches comment's user_id.`,
	() => {
		expect(
			() => {
				const comments: ReactElement<CommentComponent>[] = wrapper
					.find('comments-list')
					.getNodes();

				for (let comment of comments) {
					if (comment.props.user_id === userId && !comment.props.editable) {
						return false;
					} else if (comment.props.editable) {
						return false;
					}
				}
				return true;
			}
		).toBe(true);
	}
);

// it(
// 	`Should send a comment edited event to the server when editable div is blurred.`,
// 	() => {
//
// 	}
// );
