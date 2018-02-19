import * as React from 'react';
import { SVGS } from '../../../../assets/react-svgs.asset';
<<<<<<< HEAD
import { SearchBarProps } from '../../../../models/components/search.model';
=======
import { SearchBarProps } from '../../../../models/search.model';
>>>>>>> d3a0ba6845dd46e58b9a2a03c4d7312fd9f3e43a
import { SyntheticEvent } from 'react';
import { ChangeEvent } from 'react';

export const SearchBarComponent = (props: SearchBarProps) => {
	return(
		<div
			className="search-bar-component"
		>
			<input
				type="text"
				className="search-input"
				onChange={
					(evt: ChangeEvent<HTMLInputElement>) => {
						props.handleInputChange.next(evt.target.value);
					}
				}
				onKeyDown={(evt: SyntheticEvent<HTMLInputElement>) => {
					if ((evt as any).keyCode === 13) {
						props.handleEnterPress.next((evt.target as any).value);
					}
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
