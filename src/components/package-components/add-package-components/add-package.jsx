/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import Sidebar from '../../general-components/sidebar'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import '../../../css/addPackage.css'

/**
 * Class target is to show the add package page and handles an appropriate http request In front of the server
 */
class AddPackage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			description: '',
			quantity: '',
			price: '',
			url: '',
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
			price: event.target.value,
		})
	}

	/**
	 * Function will set url to the uploaded message
	 * This will save the pictures localy only, when tried to load it, it'll not shown.
	 * @param {*} event
	 */
	handleFile = (event) => {
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
				<a href={this.state.url} target='__blank'>
					Check picture url
				</a>
			)
	}

	/**
	 * Handles the submit in the form below, send the whole state to db
	 */
	handleSubmit = () => {
		event.preventDefault()
		axios
			.post('/add-new-package', this.state)
			.then((response) => {
				alert(response.data.message)
				this.props.history.push('/packages')
			})
			.catch((error) => {
				alert(error.response.data.message)
				console.log(error.response.data.message)
			})
	}

	render() {
		if (
			sessionStorage.getItem('logged-in-role') == 'Admin' ||
			sessionStorage.getItem('logged-in-role') == 'Travel Agent'
		) {
			return (
				<>
					<div className='row hp-divs'>
						<div className='col-xs-12'>
							<Sidebar history={this.props.history} />
						</div>
					</div>
					<h3 className='h-as-title'>AddPackage</h3>
					<Form className='add-package-form' onSubmit={this.handleSubmit}>
						<Form.Group>
							<Form.Label>Package name</Form.Label>
							<Form.Control required onChange={this.handleName} />
						</Form.Group>
						<Form.Group>
							<Form.Label>Description</Form.Label>
							<Form.Control
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
								onChange={this.handlePrice}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Quantity</Form.Label>
							<Form.Control
								type='number'
								required
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
								required
							/>
							{this.handleURLLink()}
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

export default AddPackage
