/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react'
import { Card, ListGroupItem, ListGroup } from 'react-bootstrap'

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
		}
	}

	render() {
		return (
			<Card style={{ width: '18rem', height: '23rem' }}>
				<Card.Img variant='top' src={this.state.url} />
				<Card.Body style={{ overflow: 'auto' }}>
					<Card.Title>{this.state.name}</Card.Title>
					<Card.Text>{this.state.description}</Card.Text>
				</Card.Body>
				<ListGroup className='list-group-flush'>
					<ListGroupItem>Price: {this.state.price}</ListGroupItem>
					<ListGroupItem>Packages left: {this.state.quantity}</ListGroupItem>
				</ListGroup>
				<Card.Body>
					<Card.Link href='/orders-list'>Make an Order!</Card.Link>
				</Card.Body>
			</Card>
		)
	}
}
