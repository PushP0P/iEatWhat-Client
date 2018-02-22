import { RouteComponentProps } from 'react-router';
import * as React from 'react';
import { ReactElement } from 'react';

export interface ArticleProps {
	RouterProps: RouteComponentProps<HTMLElement>;
}

export interface ArticleState {
	articleId: string;
	imgUrl: string;
	content: {
		[section: string]: {
			title: string;
			text: ReactElement<HTMLDivElement> | string;
		}
	};
}

const INITIAL_DATA: ArticleState = {
	articleId: '123',
	imgUrl: '#',
	content: {
		section0: {
			title: 'Lorem Ipsum',
			text: `
				Lorem Ipsum is simply dummy text of the printing and typesetting industry.
				Lorem Ipsum has been the industry's &lt; standard dummy text ever since the 1500s,
				when an unknown printer took a galley of type and scrambled it to make a type specimen book.
				It has survived not only five centuries, but also the leap into electronic typesetting,
				remaining essentially unchanged. It was popularised in the 1960s with the release of
				Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
				software like Aldus PageMaker including versions of Lorem Ipsum.
			`
		},
		section1: {
			title: 'Lorem Ipsum',
			text: 'This is placeholder text.'
		}
	}
};

export class ArticleComponent extends React.Component<ArticleProps, ArticleState> {
	public state: ArticleState = INITIAL_DATA;
	public componentDidMount() {
		// const ARTICLE_ID: string = this.props.RouterProps.match.params.id;
	}

	public render() {
		return (
			<div
				className="article-component"
			>

				<h2>
					Title
				</h2>
				{Object.keys(this.state.content).map((key: string) => {
					return (
						<div
							key={key.toString()}
						>
							<h3>
								{this.state.content[key].title}
							</h3>
							<p>
								{this.state.content[key].text}
							</p>
						</div>
					);
				})}
			</div>
		);
	}
}
