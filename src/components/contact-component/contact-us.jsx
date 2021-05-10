import React, { Component } from 'react'
import '../../css/contanctUs.css'

class ContactUs extends Component {
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
						/>
					</div>
					<div>
						<textarea className='message' placeholder='Message *' required />
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
