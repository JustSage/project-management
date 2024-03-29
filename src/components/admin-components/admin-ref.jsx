/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import NavbarComponent from '../general-components/navbar'
import { Button, Form, Container } from 'react-bootstrap'
import '../../css/Admin.css'
import axios from 'axios'

/**
 * Class represented only to admin and allows him to modify references in the Travel Agency data.
 */
class AdminRef extends Component {
	constructor(props) {
		super(props)
		this.state = {
			role: 'Admin',
			username: '',
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleSelectedOption = this.handleSelectedOption.bind(this)
		this.handleUsername = this.handleUsername.bind(this)
	}

	/**
	 *	Function Handling the submmition of the typed data to server, if it succees alert an ok message, else an error
	 */
	handleSubmit = () => {
		event.preventDefault()
		axios
			.post(
				'/modify-role',
				{
					newRole: this.state.role,
					username: this.state.username,
				},
				{ headers: { 'content-type': 'application/json' } }
			)
			.then((response) => {
				alert(response.data.message)
				this.props.history.push('/homepage')
			})
			.catch((error) => {
				alert(error.response.data.message)
			})
	}

	/**
	 * Function handling the selected option
	 * @param {*} option
	 */
	handleSelectedOption = (option) => {
		this.setState({ role: option.target.value })
	}

	/**
	 * Function handling the username that was typed
	 * @param {*} option
	 */
	handleUsername = (option) => {
		this.setState({ username: option.target.value })
	}

	render() {
		return (
			<>
				<h3 className='h-as-title admin-title'>Admin</h3>
				<Container className='container-admin'>
					<Form className='admin-form' onSubmit={this.handleSubmit}>
						<Form.Group controlId='exampleForm.ControlInput1'>
							<Form.Control
								placeholder='Enter username here'
								required
								onChange={this.handleUsername}
							/>
						</Form.Group>
						<Form.Group controlId='exampleForm.ControlSelect2'>
							<Form.Label>Select new role:</Form.Label>
							<Form.Control as='select' onChange={this.handleUsername}>
								<option>Admin</option>
								<option>Customer</option>
								<option>Travel Agent</option>
							</Form.Control>
						</Form.Group>
						<div className='submit-btn'>
							<Button type='submit' style={{ border: 'none' }}>
								Submit!
							</Button>
						</div>
					</Form>
				</Container>
			</>
		)
	}
}

export default AdminRef
