import React, { Component } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import ReadMessage from './read-message'

class Inbox extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: undefined,
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
		if (this.state.data === undefined) {
			return (
				<div className='text-center'>
					<div className='spinner-border' role='status'>
						<span className='sr-only'>Loading...</span>
					</div>
				</div>
			)
		} else {
			return (
				<>
					<h1 align='center'>Inbox</h1>
					<ReadMessage></ReadMessage>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Subject</th>
								<th>From</th>
							</tr>
						</thead>
						<tbody>
							{this.state.data.map((msg, index) => {
								return (
									<tr key={index} onClick={this.readMessageModal}>
										<td>{index}</td>
										<td>{msg.Subject}</td>
										<td>{msg.SourceEmail}</td>
									</tr>
								)
							})}
						</tbody>
					</Table>
				</>
			)
		}
	}
}

export default Inbox
