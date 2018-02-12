import {SyntheticEvent} from 'react';

export interface SearchBarProps {
 	onQuery: (evt: SyntheticEvent<HTMLInputElement>) => void
}
