/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import '../../css/contanctUs.css'
import axios from 'axios'
import swal from 'sweetalert'
import { Form, Button } from 'react-bootstrap'

class SendTo extends Component {
	constructor(props) {
		super(props)
		this.state = {
			Subject: this.props.match.params.Subject,
			Message: '',
			sendTo: this.props.match.params.SourceEmail,
		}
	}

	handleChange = (e) => {
		/*
		Changes the state dynamically according to the user input
		*/
		this.setState({
			Message: e.target.value,
		})
	}

	handleSubmit = (event) => {
		/*
		Sends the message to the DB and if that succeeds, sends an email to the customer
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
				.post('/contact-us', {
					SourceEmail: sessionStorage.getItem('logged-in-email'),
					DestEmail: this.state.sendTo,
					Subject: `re: ${this.state.Subject}`,
					Message: this.state.Message,
					Read: false,
				})
				.then(() => {
					axios
						.post('/send-email-to', {
							email: this.state.sendTo,
							subject: `re: ${this.state.Subject}`,
							text: this.state.Message,
						})
						.then(() => {
							swal({
								title: `Reply to ${this.state.sendTo}`,
								text: 'Reply sent successfully!',
								icon: 'success',
							}).then((ok) => {
								if (ok) {
									window.location.reload(false) //refreshing the window to take down the notification
								}
							})
							this.setState({
								Message: '',
							})
						})
						.catch(() => {
							swal({
								title: `Reply to ${this.state.sendTo}`,
								text: "Error: Can't send the reply",
								icon: 'error',
							})
						})
				})
				.catch((error) => {
					swal(error.data.message)
				})
		}
	}
	render() {
		return (
			<>
				<h1 className='contact-header' align='center'>
					Reply to: {this.state.sendTo}
				</h1>
				<Form onSubmit={this.handleSubmit}>
					<Form.Group>
						<Form.Control
							className='subject'
							type='text'
							placeholder='Subject *'
							value={`re: ${this.state.Subject}`}
							readOnly
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
