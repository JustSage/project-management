/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
/* eslint-disable */
import React, { Component } from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import { retryAdapterEnhancer } from 'axios-extensions';
// import swal from 'sweetalert'
var today = new Date(Date.now() + 10 * 86400000) //Package can be ordered 10 days from today

export default class UpdatePackage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: this.props.match.params.destination,
			description: this.props.match.params.description,
			price: this.props.match.params.price,
			quantity: this.props.match.params.quantity,
			url: this.props.location.pathname.substring(
				this.props.location.pathname.indexOf('http'),
				this.props.location.pathname.length
			),
			data: undefined,
			packageDates: [],
			// dates: this.props.match.params.dates,
		}
		this.start = undefined //The start date which selected on every session
		this.handleURL = this.handleURL.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleURLLink = this.handleURLLink.bind(this)
		this.handleFile = this.handleFile.bind(this)
		this.handleName = this.handleName.bind(this)
		this.handleDescription = this.handleDescription.bind(this)
		this.handleQuantity = this.handleQuantity.bind(this)
		this.handlePrice = this.handlePrice.bind(this)
	}

	/**
	 * Function handles the entered text in url input below
	 * @param {*} event
	 */
	handleURL = (event) => {
		this.setState({
			url: event.target.value,
		})
	}

	/**
	 * Function handles the entered text in name input below
	 * @param {*} event
	 */
	handleName = (event) => {
		this.setState({
			name: event.target.value,
		})
	}

	/**
	 * Function handles the entered text in description input below
	 * @param {*} event
	 */
	handleDescription = (event) => {
		this.setState({
			description: event.target.value,
		})
	}

	/**
	 * Function handles the entered text in quantity input below
	 * @param {*} event
	 */
	handleQuantity = (event) => {
		this.setState({
			quantity: event.target.value,
		})
	}

	/**
	 * Function handles the entered text in price input below
	 * @param {*} event
	 */
	handlePrice = (event) => {
		this.setState({
			price: event.target.value + '$',
		})
	}

	/**
	 * Function will set url to the uploaded message
	 * This will save the pictures localy only, when tried to load it, it'll not shown.
	 * @param {*} event
	 */
	handleFile = (event) => {
		event.preventDefault()
		const objectURL = URL.createObjectURL(
			document.querySelector('#image').files[0]
		)
		this.setState({
			url: objectURL,
		})
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
		}
	}

	/**
	 * handles url link, shows up only if url value isn't empty
	 * @returns link to typed url
	 */
	handleURLLink = () => {
		if (this.state.url !== '')
			return (
				<a
					href={this.props.location.pathname.substring(
						this.props.location.pathname.indexOf('https'),
						this.props.location.pathname.length
					)}
					target='__blank'
				>
					Check picture url
				</a>
			)
	}

	/**
	 * Handles the submit in the form below, send the whole state to db
	 */
	handleSubmit = async (event) => {
		event.preventDefault()
		if (this.state.url === '') {
			this.setState({ url: 'insert new URL' })
		} else {
			this.setState({
				url: this.props.location.pathname.substring(
					this.props.location.pathname.indexOf('https'),
					this.props.location.pathname.length
				),
			})
		}
	
		const http = axios.create({
			baseURL: '/',
			headers: { 'Cache-Control': 'no-cache' },
			adapter: retryAdapterEnhancer(axios.defaults.adapter)
		});

		http
			.put('/update-package', {
				...this.state,
				updated: 'yes',
			}, {retryTimes: 2})
		.then((response) => {
			alert(response.data.message)
			this.props.history.push(`/packages/${null}`)
		})
		.catch((error) => {
			alert(error.message)
		})
	}

	render() {
		if (
			sessionStorage.getItem('logged-in-role') == 'Admin' ||
			sessionStorage.getItem('logged-in-role') == 'Travel Agent'
		) {
			return (
				<>
					<h3 className='h-as-title'>Update Package</h3>
					<Form className='add-package-form' onSubmit={this.handleSubmit}>
						<Form.Group>
							<Form.Label>Package name</Form.Label>
							<Form.Control
								// eslint-disable-next-line react/prop-types
								defaultValue={this.state.name}
								required
								onChange={this.handleName}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Description</Form.Label>
							<Form.Control
								defaultValue={this.state.description}
								as='textarea'
								rows={3}
								required
								onChange={this.handleDescription}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Price</Form.Label>
							<Form.Control
								type='number'
								required
								defaultValue={parseInt(
									this.state.price.substring(0, this.state.price.length - 1)
								)}
								onChange={this.handlePrice}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Quantity</Form.Label>
							<Form.Control
								type='number'
								required
								defaultValue={this.state.quantity}
								onChange={this.handleQuantity}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>
								Start date{' '}
								<span style={{ color: 'grey' }}>
									( if not changed, the previous dates will remain )
								</span>
							</Form.Label>
							<Form.Control
								id='date-input'
								type='date'
								min={today.toISOString().split('T')[0]}
								onChange={this.handleStartDate.bind(this)}
							/>
							<Form.Label>End date</Form.Label>
							<Form.Control
								id='date-input'
								type='date'
								min={today.toISOString().split('T')[0]}
								onChange={this.handleDates}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Image</Form.Label>
							<Form.Group>
								<Form.File
									id='image'
									accept='image/*'
									onChange={this.handleFile}
								/>
							</Form.Group>
							<Form.Control
								placeholder='Set image url'
								onChange={this.handleURL}
								defaultValue={this.state.url}
							/>
							{this.handleURLLink()}
						</Form.Group>
						<Button type='submit' style={{ border: 'none' }}>
							Update
						</Button>
					</Form>
				</>
			)
		}
	}
}
