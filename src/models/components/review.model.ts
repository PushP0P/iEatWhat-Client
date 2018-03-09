export interface ReviewState {
	addingReview: boolean;
	editingReview: boolean;
}

export interface ReviewProps {
	id: string;
	ndbno: string;
	authorName: string;
	text: string;
	stars: number;
	createdOn: number;
	updateOn: number;
	editable: boolean;
	editMode: boolean;
	editHandler: (type: string) => void;
}

export const REVIEWS_STATE_INIT: ReviewState = {
	addingReview: false,
	editingReview: false
};
