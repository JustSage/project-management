/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import NavbarComponent from '../../../navbar'
import Sidebar from '../../../sidebar'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import '../../../../../css/addPackage.css'

class AddPackage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			//TODO: Set package features here
			url: undefined,
		}

		this.handleURL = this.handleURL.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
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

	handleSubmit = () => {
		event.preventDefault()
		axios
			.post('/add-new-package', {
				name: '',
				description: '',
				url: this.state.url,
			})
			.then((response) => {
				alert(response.data.message)
				this.props.history.push('/packages')
			})
			.catch((error) => {
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
					<NavbarComponent history={this.props.history} />

					<div className='row hp-divs'>
						<div className='col-xs-12'>
							<Sidebar history={this.props.history} />
						</div>
					</div>
					<h3>AddPackage</h3>
					<Form className='add-package-form' onSubmit={this.handleSubmit}>
						<Form.Group>
							<Form.Label>Package name</Form.Label>
							<Form.Control
								plaintext
								readOnly
								defaultValue='package name should be here' //TODO - send it with props
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Image</Form.Label>
							<Form.Control
								placeholder='Set image url'
								onChange={this.handleURL}
							/>
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
