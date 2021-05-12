import React, { Component } from 'react'
import '../../css/contanctUs.css'
import axios from 'axios'
import swal from 'sweetalert'

class ContactUs extends Component {
	constructor(props) {
		super(props)
		this.state = {
			Users: '',
			Subject: '',
			Message: '',
		}

		axios
			.get('/agents-admins')
			.then((response) => {
				//Get fields name, remove _id attribute from the received data
				this.setState({
					Users: response.data,
				})
			})
			.catch((error) => {
				console.log(error.response.data.message)
				alert(error.response.data.message)
			})
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

		//Make a random raffle to decide which agent will get the customer mail
		const destAgent = Math.floor(Math.random() * this.state.Users.length)
		axios
			.post('/contact-us', {
				SourceEmail: sessionStorage.getItem('logged-in-email'),
				DestEmail: this.state.Users[destAgent].email,
				Subject: this.state.Subject,
				Message: this.state.Message,
			})
			.then((response) => {
				swal({
					title: 'Thank you',
					text: response.data.successMessage,
					icon: 'success',
				})
			})
			.catch((error) => {
				swal(error.data.message)
				console.log({ text: error.data.errorMessage, icon: 'error' })
			})
	}
	render() {
		return (
			<>
				<h1 className='contact-header' align='center'>
					Contact us!
				</h1>
				<form>
					<div>
						<input
							className='subject'
							type='text'
							placeholder='Subject *'
							required
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<textarea
							className='message'
							placeholder='Message *'
							required
							onChange={this.handleChange}
						/>
					</div>
					<button className='send' type='submit' onClick={this.handleSubmit}>
						Send
					</button>
				</form>
			</>
		)
	}
}

export default ContactUs
