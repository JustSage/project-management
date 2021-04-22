/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import '../../css/addPackage.css'
import 'react-router-dom'
var today = new Date(Date.now() + 10 * 86400000) //Package can be ordered 10 days from today

/**
 * Class target is to show the add package page and handles an appropriate http request In front of the server
 */
class MakeOrder extends Component {
	constructor(props) {
		super(props)
		this.state = {
			start: today.toISOString().split('T')[0], //Generates todays date
			end: '',
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDates = this.handleDates.bind(this)
	}

	/**
	 * Function handles the start and end date of the vacation
	 * @param {} event
	 */
	handleDates = (event) => {
		this.setState({
			start: event.target.value, //.split('-').reverse().join('/')
			end: new Date(
				Date.parse(event.target.value) + 5 * 86400000
			).toLocaleDateString(), //Holiday will be 5 days currently
		})
	}
	/**
	 * Handles the submit in the form below, send the whole state to db
	 */
	handleSubmit = () => {
		event.preventDefault()
		axios
			.post('/add-order', {
				...this.props,
				start: this.state.start,
				end: this.state.end,
			})
			.then((response) => {
				alert(response.data.message)
			})
			.catch((error) => {
				alert(error.data.message)
				console.log(error.data.message)
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
					<Form className='add-package-form' onSubmit={this.handleSubmit}>
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
							<Form.Label>Start Date</Form.Label>
							<Form.Control
								id='date-input'
								type='date'
								min={today.toISOString().split('T')[0]}
								value={this.state.start}
								onChange={this.handleDates}
							/>
							<Form.Label>Start Date</Form.Label>
							<Form.Control readOnly value={this.state.end} />
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
