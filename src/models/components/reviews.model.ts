export interface ReviewsProps {
	ndbno: number;
}

export interface ReviewsState {
	addingReview: boolean;
	editingReview: boolean;
}

export interface ReviewProps {
	authorId: string;
	text: string;
	ndbno: string;
	stars: number;
	updateOn: number;
	createdOn: number;
}

export const REVIEWS_STATE_INIT = {

};
