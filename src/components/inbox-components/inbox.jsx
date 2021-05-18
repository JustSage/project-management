import React, { Component } from 'react'
import axios from 'axios'

class Inbox extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: '',
		}
		axios
			.get('/messages')
			.then((response) => {
				this.setState({
					data: response.data,
				})
				console.log(response.data)
			})
			.catch((error) => {
				console.log(error.response.data.message)
				alert(error.response.data.message)
			})
	}
	render() {
		return (
			<>
				<h1>Inbox</h1>
				{/* <table>
					{this.state.data.map((msg, index) => {
						return (
							<tr key={index}>
								<td key={index}>{msg.Subject}</td>
							</tr>
						)
					})}
				</table> */}
			</>
		)
	}
}

export default Inbox
