import * as React from 'react';

export const SearchBarComponent = () => {
	return(
		<div
			className="search-bar-component"
		>
			<input
				type="text"
				className="search-input"
			/>
			<div
				className="cancel-box"
			>
				<div
					className="cancel-icon"
				>
					X
				</div>
			</div>
		</div>
	)
};
