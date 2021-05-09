/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import axios from 'axios'
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap'
import '../../css/addPackage.css'
import 'react-router-dom'

/**
 * Class target is to show the add package page and handles an appropriate http request In front of the server
 */
class MakeOrder extends Component {
	constructor(props) {
		super(props)
		this.state = {
			package: undefined,
			orderName:
				'#' +
				this.props.match.params.destination[0] +
				String(Math.floor(Math.random() * 100000)),
			OrderDate: undefined,
		}

		console.log(this.props.match.params.dates)
	}

	/**
	 * Handles the submit in the form below, send the whole state to db
	 */
	handleSubmit = (event) => {
		event.preventDefault()
		let quantity = 0
		axios
			.post('/add-order', {
				OrderName: this.state.orderName,
				User: sessionStorage.getItem('logged-in-username'),
				Destination: this.props.match.params.destination,
				Price: this.props.match.params.price,
				Deal: 'Package',
				Status: 'In Proc',
				OrderDate: undefined,
			})
			.then((response) => {
				alert(response.data.message)
			})
			.catch((error) => {
				alert(error.data.message)
				console.log(error.data.message)
			})

		axios
			.get('/one-package', {
				params: {
					Description: this.props.match.params.description,
				},
			})
			.then((response) => {
				this.setState({ data: response.data }, () => {
					quantity = this.state.data[0].quantity
					if (quantity > 0) {
						axios
							.post('/decrement-quantity', {
								description: this.props.match.params.description,
								quantity: quantity,
							})
							.then((response) => {
								alert(response.data.message)
							})
							.catch((error) => {
								alert(error.data.message)
								console.log(error.data.message)
							})
					}
				})
			})
			.catch((error) => {
				console.log(error.response.data.message)
				alert(error.response.data.message)
			})
	}

	render() {
		if (
			sessionStorage.getItem('logged-in-role') == 'Admin' ||
			sessionStorage.getItem('logged-in-role') == 'Travel Agent' ||
			sessionStorage.getItem('logged-in-role') == 'Customer'
		) {
			return (
				<>
					<h3 className='h-as-title'>Make an order</h3>
					<Form
						className='add-package-form'
						onSubmit={this.handleSubmit.bind(this)}
					>
						<Form.Group>
							<Form.Label>Order name</Form.Label>
							<Form.Control readOnly defaultValue={this.state.orderName} />
						</Form.Group>
						<Form.Group>
							<Form.Label>Package name</Form.Label>
							<Form.Control
								readOnly
								defaultValue={this.props.match.params.destination}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Description</Form.Label>
							<Form.Control
								as='textarea'
								readOnly
								defaultValue={this.props.match.params.description}
								rows={3}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Price</Form.Label>
							<Form.Control
								readOnly
								defaultValue={this.props.match.params.price}
							/>
						</Form.Group>
						<Form.Group>
							<DropdownButton id='dropdown-item-button' title='Select date'>
								{/* {this.} */}
								<Dropdown.Item as='button'>Action</Dropdown.Item>
								<Dropdown.Item as='button'>Another action</Dropdown.Item>
								<Dropdown.Item as='button'>Something else</Dropdown.Item>
							</DropdownButton>
						</Form.Group>
						<Button type='submit' style={{ border: 'none' }}>
							Submit!
						</Button>
					</Form>
				</>
			)
		} else {
			return (
				<>
					<h2>
						You have no permission to visit this page, please{' '}
						<a href='/'>Log-in</a>
					</h2>
				</>
			)
		}
	}
}

export default MakeOrder
