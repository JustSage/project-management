/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import '../../css/contanctUs.css'
import axios from 'axios'
import swal from 'sweetalert'
import { Form, Button } from 'react-bootstrap'

class SendTo extends Component {
	constructor(props) {
		super(props)
		console.log(props)
		this.state = {
			Users: '',
			Subject: '',
			Message: '',
			sendTo: this.props.match.params.SourceEmail,
		}
	}

	handleChange = (e) => {
		/*
		Changes the state dynamically according to the user input
		*/
		if (e.target.localName === 'input') {
			this.setState({
				Subject: e.target.value,
			})
		} else {
			this.setState({
				Message: e.target.value,
			})
		}
	}

	handleSubmit = (event) => {
		/*
		Sends the message to the DB
		*/
		event.preventDefault()

		if (this.state.Subject === '' || this.state.Message === '') {
			swal({
				title: 'Error',
				text: "Fields can't be empty",
				icon: 'error',
			})
		} else {
			axios
				.post('/send-email-to', {
					email: this.state.sendTo,
					subject: this.state.Subject,
					text: this.state.Message,
				})
				.then(() => {
					swal({
						title: `Email to ${this.state.email}`,
						text: 'email sent successfully!',
						icon: 'success',
					})
				})
				.catch(() => {
					alert('email did not sent successfully!')
				})
		}
	}
	render() {
		return (
			<>
				<h1 className='contact-header' align='center'>
					Send to: {}
				</h1>
				<Form onSubmit={this.handleSubmit}>
					<Form.Group>
						<Form.Control
							className='subject'
							type='text'
							placeholder='Subject *'
							onChange={this.handleChange}
							value={this.state.Subject}
							required
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							as='textarea'
							className='message'
							placeholder='Message *'
							rows={7}
							onChange={this.handleChange}
							value={this.state.Message}
							required
						/>
					</Form.Group>
					<Button className='send' type='submit'>
						Send
					</Button>
				</Form>
			</>
		)
	}
}

export default SendTo
