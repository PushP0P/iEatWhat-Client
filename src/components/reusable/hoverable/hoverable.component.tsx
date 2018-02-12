import * as React from 'react';
import { ReactElement } from 'react';

interface HoverableProps {
	label: string;
	icon: string;
	children?: ReactElement<HTMLDivElement> | HTMLDivElement
}

export const Hoverable = (props: HoverableProps) => {
	return(
		<div
			className="hoverable hover-trigger"
		>
			<label>
				{props.icon}
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
