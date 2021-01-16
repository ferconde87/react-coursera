import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

	renderDish(dish) {
		return (
			<Card>
				<CardImg width="100%" object src={dish.image} alt={dish.name} />
				<CardBody>
					<CardTitle>{dish.name}</CardTitle>
					<CardText>{dish.description}</CardText>
				</CardBody>
			</Card>
		);
	}

	renderComments(comments){
		if (comments || comments.length) {
			const list = [];
			comments.forEach(comment => {
				list.push(
					<li key={comment.id}>
						<p>{comment.comment}</p>
						<p>--{comment.author},{new Intl.DateTimeFormat('default', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
					</li>
				);
			});
			return (
				<div>
					<h4>Comments</h4>
					<ul className="list-unstyled">
						{list}
					</ul>
				</div>
			);
		} else {
			return (
				<div />
			);
		} 
	}

	render() {
		const dish = this.props.dish;
		if (dish == null) {
			return(
				<div />
			);
		} else {
			return(
				<div className="container">
					<div className="row ">
						<div className="col-12 col-md-5 m-1">
							{this.renderDish(dish)}
						</div>
						<div className="col-12 col-md-5 m-1">
							{this.renderComments(dish.comments)}
						</div>
					</div>
				</div>
			)
		}
	}
}

export default DishDetail;
