/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
// import { Form } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
// import Package from '../package'
import { Form, Button } from 'react-bootstrap'

import '../../../css/addPackage.css'
// import PropTypes from 'prop-types'

export default class UpdatePackage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: this.props.match.params.destination,
			description: this.props.match.params.description,
			price: this.props.match.params.price,
			quantity: this.props.match.params.quantity,
			url: this.props.match.params.url,
			data: undefined,
		}
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
	handleSubmit = (event) => {
		event.preventDefault()
		this.setState({
			url: this.props.location.pathname.substring(
				this.props.location.pathname.indexOf('https'),
				this.props.location.pathname.length
			),
		})

		axios
			.post('/update-package', {
				...this.state,
				updated: 'yes',
			})
			.then((response) => {
				alert(response.data.message)
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
							<Form.Label>Image</Form.Label>
							<Form.Group>
								<Form.File
									id='image'
									accept='image/*'
									onChange={this.handleFile}
								/>
							</Form.Group>
							<Form.Control
								placeholder='Or set image url'
								onChange={this.handleURL}
								defaultValue={this.props.location.pathname.substring(
									this.props.location.pathname.indexOf('https'),
									this.props.location.pathname.length
								)}
								required
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
