import { CommentsList, CommentsListMeta, generateDemoComment } from '../models/comments.model';
import * as fb from 'firebase';

export class CommentsService {

	private token: string;
	private user: firebase.User;

	constructor() {
		this.initialize();
	}

	public async initialize(): Promise<void> {
		this.user = await <firebase.User> fb.auth().currentUser;
		this.token = await this.user.getIdToken();
	}

	public async getUserComments(): Promise<CommentsList> {

		// static userData = await stores.get('userData', 'account');
		// FIXTURES
		return {
			'Message123': generateDemoComment(this.token),
			'Message143': generateDemoComment(this.token),
			'Message423': generateDemoComment(this.token),
		};
	}

	public async  getComments(listId: string): Promise<CommentsList> {
		// FIXTURES
		const responsePack = await this.getUserComments();
		const response: CommentsList = responsePack;
		// END
		return this.enableEditForUserComments(response, this.token);
	}

	public async getCommentsListMeta(containerId: string): Promise<CommentsListMeta> {
		return {
			listId: containerId,
			topic: 'Demo',
		};
	}

	/**
	 * Helpers
	 */
	public enableEditForUserComments(comments: CommentsList, userId: string): CommentsList {
		return Object.keys(comments).reduce(
			(agg: CommentsList, key: string) => {
				if (comments[key].userId === userId) {
					return {...{}, ...agg, [key]: {...comments[key], editable: true}};
				}
				return {...{}, ...agg, [key]: {...comments[key]}};
			},
			{}
		);
	}
}
