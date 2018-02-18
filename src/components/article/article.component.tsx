import {RouteComponentProps} from "react-router";
import * as React from "react";

export interface ArticleProps {
	RouterProps:RouteComponentProps<HTMLElement>;
}

export interface ArticleState {
	ArticleId:string;
	Content:{
		[section:string]:{
			title:string;
			text:string;
		}
	}
}

const INITIAL_DATA:ArticleState = {
	ArticleId:"123",
	Content:{
		section0: {
			title: "Lorem Ipsum",
			text: "This is placeholder text."
		},

		section1: {
			title: "Lorem Ipsum",
			text: "This is placeholder text."
		}
	}
};

export class ArticleComponent extends React.Component<ArticleProps,ArticleState>{
	public state:ArticleState = INITIAL_DATA;
	public componentDidMount(){
		//const ARTICLE_ID:string = this.props.RouterProps.match.params.id;
	}

	public render() {
		return (
			<div>

				<h2>
					Title
				</h2>
				{Object.keys(this.state.Content).map((key:string) => {
					return(
						<div>
							<h3>
								{this.state.Content[key].title}
							</h3>
							<p>
								{this.state.Content[key].text}
							</p>
						</div>
					);
				})}

				<h3>
					Subtitle
				</h3>

				<p>
					Lorem Ipsum is simply dummy text of the printing and typesetting industry.
					Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
					when an unknown printer took a galley of type and scrambled it to make a type specimen book.
					It has survived not only five centuries, but also the leap into electronic typesetting,
					remaining essentially unchanged. It was popularised in the 1960s with the release of
					Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
					software like Aldus PageMaker including versions of Lorem Ipsum.
				</p>

				<h3>
					Subtitle
				</h3>

				<p>
					Lorem Ipsum is simply dummy text of the printing and typesetting industry.
					Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
					when an unknown printer took a galley of type and scrambled it to make a type specimen book.
					It has survived not only five centuries, but also the leap into electronic typesetting,
					remaining essentially unchanged. It was popularised in the 1960s with the release of
					Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
					software like Aldus PageMaker including versions of Lorem Ipsum.
				</p>
			</div>
		)
	}
}
