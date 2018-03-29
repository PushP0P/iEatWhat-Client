import * as React from 'react';
import { ReactElement } from 'react';

interface DescriptionComponentProps {
	name: string;
	ndbno: string;
	blurb?: string;
}

export const DescriptionComponent = (props: DescriptionComponentProps): ReactElement<HTMLDivElement> => {
	return(
		<div
			className="description-component"
		>
			<h2>Description</h2>
			<ul>
				<li>
					<span>
						<b>Name: </b>
						{props.name}
					</span>
				</li>
				<li>
					<span>
						<b>NDBNO: </b>
						{props.ndbno}
					</span>
				</li>
			</ul>
			<p>
				{props.blurb}
			</p>
		</div>
	);
};
