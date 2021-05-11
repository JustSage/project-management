/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import axios from 'axios'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

var today = new Date(Date.now() + 10 * 86400000) //Package can be ordered 10 days from today

/**
 * Class target is to show the add package page and handles an appropriate http request In front of the server
 */
class AddPackage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			description: '',
			quantity: 0,
			price: '',
			url: '',
			updated: 'No',
			rating: 0,
			packageDates: [],
		}

		this.start = undefined //The start date which selected on every session
	}

	handleURL = (event) => {
		this.setState({
			url: event.target.value,
		})
	}

	handleName = (event) => {
		this.setState({
			name: event.target.value,
		})
	}

	handleDescription = (event) => {
		this.setState({
			description: event.target.value,
		})
	}

	handleQuantity = (event) => {
		this.setState({
			quantity: parseInt(event.target.value),
		})
	}

	handlePrice = (event) => {
		this.setState({
			price: event.target.value + '$',
		})
	}

	handleFile = (event) => {
		const objectURL = URL.createObjectURL(
			document.querySelector('#image').files[0]
		)
		this.setState({
			url: objectURL,
		})
	}

	handleURLLink = () => {
		if (this.state.url !== '')
			return (
				<a href={this.state.url} target='__blank'>
					Check picture url
				</a>
			)
	}

	handleStartDate = (event) => {
		this.start = event.target.value.split('T')[0]
	}

	handleDates = (event) => {
		event.preventDefault()
		const end = event.target.value.split('T')[0]
		const dates = this.start + ' to ' + end

		if (this.state.packageDates.includes(dates)) {
			alert('Dates already exist')
		} else if (new Date(this.start) > new Date(end)) {
			alert('You picked illegal dates!')
		} else {
			this.setState({
				packageDates: [...this.state.packageDates, dates],
			})
			alert(`Successfully added vacation dates:${dates}`)
			console.log(this.state.packageDates)
		}
	}

	handleSubmit = () => {
		event.preventDefault()
		axios
			.post('/add-package', this.state)
			.then((response) => {
				alert(response.data.message)
				this.props.history.push('/packages')
			})
			.catch((error) => {
				alert(error)
				console.log(error)
			})
	}

	render() {
		if (
			sessionStorage.getItem('logged-in-role') == 'Admin' ||
			sessionStorage.getItem('logged-in-role') == 'Travel Agent'
		) {
			return (
				<>
					<Container fluid>
						<Row>
							<h3 className='h-as-title'>AddPackage</h3>
						</Row>
						<Row>
							<Col sm={3} />
							<Col sm={6}>
								<Form
									className='add-package-form'
									onSubmit={this.handleSubmit.bind(this)}
								>
									<Form.Group>
										<Form.Label>Package name</Form.Label>
										<Form.Control
											required
											onChange={this.handleName.bind(this)}
										/>
									</Form.Group>
									<Form.Group>
										<Form.Label>Description</Form.Label>
										<Form.Control
											as='textarea'
											rows={3}
											required
											onChange={this.handleDescription.bind(this)}
										/>
									</Form.Group>
									<Form.Group>
										<Form.Label>Price</Form.Label>
										<Form.Control
											type='number'
											required
											onChange={this.handlePrice.bind(this)}
										/>
									</Form.Group>
									<Form.Group>
										<Form.Label>Quantity</Form.Label>
										<Form.Control
											type='number'
											required
											onChange={this.handleQuantity.bind(this)}
										/>
									</Form.Group>
									<Form.Group>
										<Form.Label>Image</Form.Label>
										<Form.Control
											placeholder='Set image url'
											onChange={this.handleURL.bind(this)}
											required
										/>
										{this.handleURLLink()}
									</Form.Group>
									<Form.Group>
										<Form.Label>Start date</Form.Label>
										<Form.Control
											id='date-input'
											type='date'
											min={today.toISOString().split('T')[0]}
											onChange={this.handleStartDate.bind(this)}
											required
										/>
										<Form.Label>End date</Form.Label>
										<Form.Control
											id='date-input'
											type='date'
											min={today.toISOString().split('T')[0]}
											onChange={this.handleDates}
											required
										/>
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

export default AddPackage
