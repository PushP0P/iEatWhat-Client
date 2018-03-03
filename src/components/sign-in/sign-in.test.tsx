//tslint:disable
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Router} from 'react-router';
import * as renderer from 'react-test-renderer';
import history from '../../router/router.history';
import { SignInOptions } from './sign-in-options.controlled';

let component: any;
let doc: any = document;
const SIGN_IN_OPTIONS = [
	{
		id: '1234',
		title: 'Google',
		icon: 'google',
		handler: () => {}
	},
	{
		id: '5678',
		title: 'Twitter',
		icon: 'twitter',
		handler: () => {}
	}
];

it('renders without crashing', () => {
	doc.createElement('div');
	component = ReactDOM.render(
		<Router
			history={history}
		>
		</Router>,
		doc);
});

it(`SignInOptions has ${SIGN_IN_OPTIONS.length} buttons`, () => {
	component = renderer.create(
		<SignInOptions
			signInOptions={SIGN_IN_OPTIONS}
		/>
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
	expect(SIGN_IN_OPTIONS.length).toBe(tree.children.length);
});
