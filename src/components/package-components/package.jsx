/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react'
import {
	// Container,
	Button,
	Card,
	ListGroupItem,
	ListGroup,
	// Col,
	Form,
	// Row,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import '../../css/Package.css'

library.add(faStar)

/* 
	the main idea behind Package Component:
	this component will represent Packages containing flights and hotels and rent car services in different places.
	it should be a boundle of smaller and reusable components, like card, courusel and much more.
*/
export default class Package extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: this.props.name,
			description: this.props.description,
			quantity: this.props.quantity,
			price: this.props.price,
			url: this.props.url,
			rating: this.props.rating,
			dates: this.props.dates,
		}
		// this.handleRating = this.handleRating.bind(this)
	}

	handleRating = () => {
		console.log(event.target.value)
		axios
			.post('/update-rating', {
				name: this.props.name,
				rating: event.target.value,
			})
			.then((response) => {
				alert(response.data.message)
				this.props.history.push('/packages')
			})
			.catch((error) => {
				alert(error)
				console.log(error)
			})
	}
	updatedPackageDisplay = () => {
		if (
			sessionStorage.getItem('logged-in-role') == 'Admin' ||
			sessionStorage.getItem('logged-in-role') == 'Travel Agent'
		) {
			if (this.props.updated === 'yes') {
				return <span style={{ color: 'red' }}>Package Updated</span>
			} else {
				return null
			}
		} else {
			return null
		}
	}

	render() {
		return (
			<Card className='myCard'>
				<Card.Img className='myCardImage' variant='top' src={this.state.url} />
				<Card.Body className='card-body'>
					<Card.Title>
						{this.state.name} {this.updatedPackageDisplay()}
						<FontAwesomeIcon className='fa fa-star' icon={faStar} />{' '}
						<span className='rating'>{this.state.rating}</span>
						{/* {this.updatedPackageDisplay()} */}
					</Card.Title>
					<Card.Text className='card-text'>{this.state.description}</Card.Text>
				</Card.Body>
				<ListGroup className='list-group-flush'>
					<ListGroupItem>Price: {this.state.price}</ListGroupItem>
					<ListGroupItem>Packages left: {this.state.quantity}</ListGroupItem>
				</ListGroup>
				<Card.Body>
					<Link
						to={{
							pathname: `/make-order/${this.props.name}/${this.props.price}/${this.props.description}/${this.props.quantity}/${this.props.dates}`,
						}}
						className='card-link'
					>
						<Button variant='success' className='mao-btn'>
							Make an Order!
						</Button>
					</Link>
					<Card.Body>
						<Form>
							<Form.Group>
								<Form.Label>Rate Package:</Form.Label>
								<Form.Control
									onChange={this.handleRating.bind(this)}
									as='select'
								>
									<option id='op1'>1</option>
									<option id='op2'>2</option>
									<option id='op3'>3</option>
									<option id='op4'>4</option>
									<option id='op5'>5</option>
								</Form.Control>
							</Form.Group>
						</Form>
					</Card.Body>
					{sessionStorage.getItem('logged-in-role') != 'Customer' ? (
						<Card.Body>
							<div className='updrage-delete'>
								<Button variant='primary' className='upgrade-btn'>
									<Link
										style={{ color: 'white' }}
										to={{
											pathname: `/update-package/${this.props.name}/${this.props.description}/${this.props.price}/${this.props.quantity}/${this.props.url}`,
										}}
									>
										Upgrade{' '}
									</Link>
								</Button>
								<Button variant='primary' className='delete-btn'>
									<Link
										style={{ color: 'white' }}
										to={{
											pathname: `/delete-package/${this.props.name}`,
										}}
									>
										Delete{' '}
									</Link>
								</Button>
							</div>
						</Card.Body>
					) : null}
				</Card.Body>
			</Card>
		)
	}
}
