import * as React from 'react';
import { SVGS } from '../../../assets/react-svgs.asset';
import {SearchBarProps} from '../../../models/search-bar.model';

export const SearchBarComponent = (props: SearchBarProps) => {

	return(
		<div
			className="search-bar-component"
		>
			<input
				type="text"
				className="search-input"
				onBlur={props.onQuery}
			/>
			<div
				className="cancel-box"
			>
				<div
					className="search-icon"
				>
					{SVGS.search}
				</div>
			</div>
		</div>
	);
};
