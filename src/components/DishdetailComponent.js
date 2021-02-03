/* eslint-disable react/jsx-pascal-case */
import React, { Component }  from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, 
	Modal, ModalHeader, ModalBody, Button, Row, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {

	constructor(props){
		super(props);

		this.state = {
			isModalOpen: false
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
	}

	handleSubmit(values) {
		console.log("Current State is : " + JSON.stringify(values));
		this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}

	render(){
		return(
			<>
				<Button onClick={this.toggleModal} outline>
						<span className="fa fa-pencil fa-lg"></span> Submit Comment
				</Button>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={(values) => this.handleSubmit(values)} className="col-12">
							<Row className="form-group">
								<Label htmlFor="rating" >Rating</Label>
								<Control.select model=".rating" name="rating" className="form-control">
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</Control.select>
							</Row>
							<Row className="form-group">
								<Label htmlFor="author">Your Name</Label>
								<Control.text model=".author" id="author" name="author" 
									className="form-control" placeholder="Your Name"
									validators={{
										minLength: minLength(3), maxLength: maxLength(15)
										}} />
								<Errors
									className="text-danger"
									model=".author"
									show="touched"
									messages={{
										minLength: 'Must be greater than 2 characters',
										maxLength: 'Must be 15 characters or less'
									}}
								/>
							</Row>
							<Row className="form-group">
								<Label htmlFor="comment">Comment</Label>
								<Control.textarea model=".comment" id="comment" name="comment" rows="6"
									className="form-control" />
							</Row>
							<Row className="form-group">
								<Button type="submit" color="primary">Submit</Button>
							</Row>
						</LocalForm>
					</ModalBody>
				</Modal>
			</>
		);
	}
}



function RenderDish({dish}) {
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

function RenderComments({comments, addComment, dishId}){
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
				<CommentForm dishId={dishId} addComment={addComment} ></CommentForm>
			</div>
		);
	} else {
		return (
			<div />
		);
	} 
}

const DishDetail = (props) => {
	if (props.isLoading) {
		return(
			<div className="container">
				<div className="row">
					<Loading />
				</div>
			</div>
		);
	} else if (props.errMess) {
		return(
			<div className="container">
				<div className="row">
					<h4>{props.errMess}</h4>
				</div>
			</div>
		);
	} else if (props.dish == null) {
		return(
			<div />
		);
	} else {
		return(
			<div className="container">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
						<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3>{props.dish.name}</h3>
						<hr />
					</div>
				</div>
				<div className="row ">
					<div className="col-12 col-md-5 m-1">
						<RenderDish dish={props.dish} />
					</div>
					<div className="col-12 col-md-5 m-1">
						<RenderComments comments={props.comments} 
							addComment={props.addComment}
							dishId={props.dish.id} />
					</div>
				</div>
			</div>
		)
	}
}

export default DishDetail;
