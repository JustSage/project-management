/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react'
import { Button, Card, ListGroupItem, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
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

	varifyAccess = () => {
		if (
			sessionStorage.getItem('logged-in-role') == 'Admin' ||
			sessionStorage.getItem('logged-in-role') == 'Travel Agent'
		) {
			return (
				<div className='list-group list-group-horizontal'>
					<a className='list-group-item list-group-item-action' key='Add'>
						<Link to='/add-package'>Add Package</Link>
					</a>
					<a key='Upgrade' className='list-group-item list-group-item-action'>
						<Link to='/update-package'>Upgrade Package</Link>
					</a>
					<a key='Delete' className='list-group-item list-group-item-action'>
						<Link to='/delete-package'>Delete Package</Link>
					</a>
				</div>
			)
		}
	}

	render() {
		return (
			<Card
				style={{
					borderRadius: '25px',
					borderTopLeftRadius: '25px',
					width: '18rem',
					height: '30rem',
				}}
			>
				<Card.Img
					style={{
						borderTopLeftRadius: '25px',
						borderTopRightRadius: '25px',
					}}
					variant='top'
					src={this.state.url}
				/>
				<Card.Body style={{ overflow: 'auto' }}>
					<Card.Title>{this.state.name}</Card.Title>
					<Card.Text>{this.state.description}</Card.Text>
				</Card.Body>
				<ListGroup className='list-group-flush'>
					<ListGroupItem>Price: {this.state.price}</ListGroupItem>
					<ListGroupItem>Packages left: {this.state.quantity}</ListGroupItem>
				</ListGroup>
				<Card.Body>
					<Link
						to={{
							pathname: `/make-order/${this.props.name}/${this.props.price}/${this.props.description}`,
						}}
						className='card-link'
					>
						Make an Order!
					</Link>
					{sessionStorage.getItem('logged-in-role') != 'Customer' ? (
						<div className='row justify-content-center'>
							<Button className='update-button' variant='warning'>
								<Link
									to={{
										pathname: `/update-package/${this.props.name}/${this.props.description}/${this.props.price}/${this.props.quantity}/${this.props.url}`,
									}}
								>
									Upgrade{' '}
								</Link>
							</Button>
						</div>
					) : null}
				</Card.Body>
			</Card>
		)
	}
}
