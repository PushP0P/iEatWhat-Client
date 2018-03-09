import { SVGS } from '../../../assets/react-svgs.asset';
import { ReactElement } from 'react';

export const Stars = (props: {fullStars: number}) => {
	// todo fix any
	const stars: ReactElement<HTMLElement> | any = () => {
		let starSequence: ReactElement<HTMLElement>[] = [];
		for(let i = 0; i < props.fullStars; i++) {
			starSequence = [...starSequence, SVGS.star];
		}
		for (let i = 0; i < 5 - props.fullStars; i++) {
			starSequence = [...starSequence,  SVGS.starOutline];
		}
		return starSequence;
	};
	let counter: number = 0;

	return(
		<div
			className="review-stars"
		>
			{stars().map((star: ReactElement<HTMLElement>) => {
				return (
					<div
						key={counter++}
					>
						{star}
					</div>
				);
			})}
		</div>
	)
};
