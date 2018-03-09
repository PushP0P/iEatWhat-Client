import { Action } from '../../../models/store/action.model';
import { FoodProduct } from '../../../models/food.model';
import { ReviewProps } from '../../../models/components/review.model';

export function actionRetrievingReport(): Action {
	return {
		type: 'RETRIEVING_REPORT',
	}
}

export function actionReportReceived(report: FoodProduct): Action {
	return {
		type: 'RETRIEVING_REPORT',
		payload: report
	}
}

export function actionReviewSubmited(review: ReviewProps): Action {
	return {
		type: 'REVIEW_CREATED',
		payload: review
	}
}

export function actionReviewUpdated(review: ReviewProps): Action {
	return {
		type: 'REVIWEW_UPDATED',
		payload: review
	}
}

export function actionReviewRemoved(reviewId: string): Action {
	return {
		type: 'REVIEW_REMOVED',
		payload: reviewId
	}
}

