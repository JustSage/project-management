import React, { Component } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import '../../css/inbox.css'

library.add(faEnvelope)
class Notification extends Component {
	constructor(props) {
		super(props)
		this.state = {
			unreadMessages: 0,
		}
	}

	componentDidMount() {
		axios
			.get('/read-massages')
			.then((response) => {
				var filteredMail = response.data.filter((msg) => {
					return msg.DestEmail === sessionStorage.getItem('logged-in-email')
				})
				this.setState({
					unreadMessages: filteredMail.length,
				})
				console.log(response.data)
			})
			.catch((error) => {
				console.log(error.response.data.message)
				alert(error.response.data.message)
			})
	}

	render() {
		if (this.state.unreadMessages === 0) {
			return (
				<FontAwesomeIcon
					className='envelope'
					style={{ color: 'black' }}
					icon='envelope'
					data-toggle='tooltip'
					title='Inbox'
				></FontAwesomeIcon>
			)
		} else {
			return (
				<>
					<span style={{ color: 'black' }}>{this.state.unreadMessages}x</span>
					<FontAwesomeIcon
						className='envelope'
						style={{ color: 'red' }}
						icon='envelope'
						data-toggle='tooltip'
						title={`${this.state.unreadMessages} new messages`}
					></FontAwesomeIcon>
				</>
			)
		}
	}
}

export default Notification
