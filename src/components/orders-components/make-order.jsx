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
			quantityArr: [],
			quantity: 1,
			package: undefined,
			orderName:
				'#' +
				this.props.match.params.destination[0] +
				String(Math.floor(Math.random() * 100000)),
			Dates: this.props.match.params.dates.split(','),
			VacationDate: undefined,
		}

		let i
		for (i = 0; i < this.props.match.params.quantity; i++) {
			this.state.quantityArr.push(i + 1)
		}
		console.log(this.state.quantityArr)
		console.log(this.props.match.params.dates)
	}
	handleQuanity = (event) => {
		this.setState({ quantity: event.target.value })
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
				Quantity: this.state.quantity,
				Price: this.props.match.params.price,
				Deal: 'Package',
				Status: 'In Proc',
				OrderDate: new Date(),
				VacationDate: this.state.VacationDate,
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
								quantity: quantity - this.state.quantity,
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

	handleDateSelection = (event) => {
		this.setState({
			VacationDate: event.target.value,
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
							<Form.Label>Quantity</Form.Label>
							<Form.Control
								as='select'
								id='dropdown-item-button'
								title='Select Quantity'
								defaultValue={1}
								onClick={this.handleQuanity.bind(this)}
							>
								{this.state.quantityArr.map((item, i) => {
									return (
										<option as='label' key={i}>
											{item}
										</option>
									)
								})}
							</Form.Control>
						</Form.Group>
						<Form.Group>
							<Form.Label>Price</Form.Label>
							<Form.Control
								readOnly
								defaultValue={this.props.match.params.price}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Control
								as='select'
								id='dropdown-item-button'
								title='Select date'
								onChange={this.handleDateSelection.bind(this)}
							>
								{this.state.Dates.map((item, i) => {
									return (
										<option as='label' key={i}>
											{item}
										</option>
									)
								})}
							</Form.Control>
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
