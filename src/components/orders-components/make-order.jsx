/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import axios from 'axios'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import 'react-router-dom'
import swal from 'sweetalert'

/**
 * Class target is to show the add package page and handles an appropriate http request In front of the server
 */
class MakeOrder extends Component {
	constructor(props) {
		super(props)
		this.state = {
			quantityArr: [],
			quantity: 1,
			price: parseInt(this.props.match.params.price),
			package: undefined,
			orderName:
				'#' +
				this.props.match.params.destination[0] +
				String(Math.floor(Math.random() * 100000)),
			Dates: this.props.match.params.dates.split(','),
			VacationDate: undefined,
			selectedAttractions: [],
		}

		let i
		for (i = 0; i < this.props.match.params.quantity; i++) {
			this.state.quantityArr.push(i + 1)
		}

		this.attractions = [
			['Rent a car', 100],
			['Upgrde to VIP room', 250],
			['Transfers between airport and hotel', 30],
			['Breakfeast', 100],
			['Diner', 100],
			['Spa services', 200],
			['Tour in the city', 50],
		]
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
				Price: this.state.price + '$',
				Deal: 'Package',
				Status: 'In Proc',
				OrderDate: new Date(),
				VacationDate: this.state.VacationDate,
			})
			.then((response) => {
				swal({
					title: 'Thank you',
					text: response.data.message,
					icon: 'success',
				})
			})
			.catch((error) => {
				swal(error.data.message)
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
							.then((response) => {})
							.catch((error) => {
								swal({ text: error.data.message, icon: 'error' })
							})
					}
				})
			})
			.catch((error) => {
				swal({ text: error.response.data.message, icon: 'error' })
			})
	}

	handleDateSelection = (event) => {
		this.setState({
			VacationDate: event.target.value,
		})
	}

	attrSelector = (event) => {
		let total = this.state.price
		let value = event.target.value.split('price: ')[1]
		if (this.state.selectedAttractions.includes(value)) {
			this.setState({
				price: total - parseInt(value),
			})
		} else {
			this.setState({
				selectedAttractions: [...this.state.selectedAttractions, value],
				price: total + parseInt(value),
			})
		}
	}

	render() {
		if (
			sessionStorage.getItem('logged-in-role') == 'Admin' ||
			sessionStorage.getItem('logged-in-role') == 'Travel Agent' ||
			sessionStorage.getItem('logged-in-role') == 'Customer'
		) {
			return (
				<>
					<Container fluid>
						<Row>
							<h3 className='h-as-title'>Make an order</h3>
						</Row>
						<Row>
							<Col sm={3} />
							<Col sm={7}>
								<Form
									className='add-package-form'
									onSubmit={this.handleSubmit.bind(this)}
								>
									<Form.Group>
										<Form.Label>Order name</Form.Label>
										<Form.Control
											readOnly
											defaultValue={this.state.orderName}
										/>
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
										<Form.Label>
											Select addittional features (ctrl+right click on the mouse
											to select multiple options)
										</Form.Label>
										<Form.Control
											as='select'
											htmlSize={3}
											multiple
											onChange={this.attrSelector.bind(this)}
										>
											{this.attractions.map((item, i) => {
												return (
													<option
														key={item[0]}
													>{`${item[0]}, price: ${item[1]}$`}</option>
												)
											})}
										</Form.Control>
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
										<Form.Group>
											<Form.Label>Price</Form.Label>
											<Form.Control readOnly value={this.state.price + '$'} />
										</Form.Group>
									</Form.Group>
									<Button type='submit' style={{ border: 'none' }}>
										Submit!
									</Button>
								</Form>
							</Col>
							<Col sm={2} />
						</Row>
					</Container>
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
