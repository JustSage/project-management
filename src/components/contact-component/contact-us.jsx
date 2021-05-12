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
			.post('/add-order', {
				Subject: '',
				Message: '',
			})
			.then((response) => {
				swal({
					title: 'Thank you',
					text: response.data.message,
					icon: 'success',
				})
			})
			.catch((error) => {
				swal(error.data.message)
				console.log({ text: error.data.message, icon: 'error' })
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
					<button className='send' type='submit'>
						Send
					</button>
				</form>
			</>
		)
	}
}

export default ContactUs
