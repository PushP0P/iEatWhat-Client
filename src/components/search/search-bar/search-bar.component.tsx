import * as React from 'react';
import { SVGS } from '../../../assets/react-svgs.asset';
import { SearchBarProps } from '../../../models/components/search.model';
import { SyntheticEvent } from 'react';
import { ChangeEvent } from 'react';
import { CategoriesSelect } from './categories-select.form';

export const SearchBarComponent = (props: SearchBarProps) => {
	return(
		<div
			className="search-bar-component"
		>
			<div
				className="mask"
			/>
			<div
				className="search_content"
			>
				<b
					className="search_title header h2"
				>
					Find Allergy Friendly Food
				</b>
				<div
					className="search_input-box"
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
								console.log('key press', evt);
								props.handleEnterPress();
							}
						}}
					/>
					<CategoriesSelect
						categories={props.categories}
						selected={props.selectedCategories}
						selectHandler={props.categorySelectHandler}
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
			</div>
		</div>
	);
};
