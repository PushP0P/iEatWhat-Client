import * as React from 'react';
import { SVGS } from '../../../../assets/react-svgs.asset';
import { SearchBarProps } from '../../../../models/search.model';
import { SyntheticEvent } from 'react';

export const SearchBarComponent = (props: SearchBarProps) => {
	return(
		<div
			className="search-bar-component"
		>
			<input
				type="text"
				className="search-input"
				onChange={(evt: SyntheticEvent<HTMLInputElement>) => {
					props.onInputChange((evt.target as any).value);
				}}
				onBlur={(evt: SyntheticEvent<HTMLInputElement>) => {
					props.onQuery((evt.target as any).value);
				}}
				onKeyUp={(evt: SyntheticEvent<HTMLInputElement>) => {
					props.onQuery((evt.target as any).value);
				}}
			/>
			<div
				className="icon-box"
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
