import * as React from 'react';
import { ReactElement } from 'react';

interface HoverableProps {
	label: string;
	children?: ReactElement<HTMLDivElement> | HTMLDivElement | string;
}

export const Hoverable = (props: HoverableProps) => {
	return(
		<div
			className="hoverable hover-trigger"
			onMouseEnter={() => {
				console.log('enter');
			}}
			onMouseLeave={() => {
				console.log('leave');
			}}
		>
			<label>
				{props.label}
			</label>
			<div
				className="hoverContent hover-show"
			>
				{props.children}
			</div>
		</div>
	);
};
