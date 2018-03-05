import * as React from 'react';
import { ReactElement } from 'react';
import { GridTileProps } from '../../models/components/map-box/grid-tile.model';

export const GridTileComponent = (props: GridTileProps):ReactElement<HTMLDivElement> => {
	return (
		<div
			className="grid-tile-component"
			style={{background: `url(${props.tileImage}) center no-repeat`, backgroundSize: 'cover'}}
		>

		</div>
	);
};
