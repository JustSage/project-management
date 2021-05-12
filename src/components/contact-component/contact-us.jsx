import React, { Component } from 'react'
import '../../css/contanctUs.css'
import axios from 'axios'
import swal from 'sweetalert'

class ContactUs extends Component {
	constructor(props) {
		super(props)
		this.state = {
			Subject: '',
			Message: '',
		}
	}
	handleChange = (e) => {
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
		event.preventDefault()
		axios
			.post('/contact-us', {
				Email: sessionStorage.getItem('logged-in-email'),
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
