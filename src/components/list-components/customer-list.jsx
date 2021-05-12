import axios from 'axios'
import { Table, Form, Button } from 'react-bootstrap'
import React, { Component, Fragment } from 'react'
import '../../css/orders.css'

/**
 * Component represents the orders which was made by customers.
 * Orders will represented with their full details and includes sorting options that will be eased the users to inspect the data.
 *
 */
export default class CustomerList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			textArea: '',
			customers: [],
			tableTitles: undefined,
		}
		axios
			.get('/users')
			.then((response) => {
				//Get fields name, remove _id attribute from the received data
				var arr = Object.keys(response.data[0])
					.slice(1)
					.filter(function (value) {
						return value != 'password'
					})
				this.setState({
					tableTitles: arr,
					customers: response.data,
				})
			})
			.catch((error) => {
				console.log(error.response.data.message)
				alert(error.response.data.message)
			})
	}

	handleSubmit = () => {
		let emails = []
		for (let i = 0; i < this.state.customers.length; ++i) {
			emails.push(this.state.customers[i].email)
		}
		console.log(this.state.textArea)
		axios
			.post('/send-broadcast-email', {
				emails: emails,
				text: this.state.textArea,
			})
			.then(() => {
				alert('email sent successfully!')
			})
			.catch(() => {
				alert('email did not sent successfully!')
			})
	}

	render() {
		if (this.state.tableTitles === undefined) {
			return <div>Loading...</div>
		} else
			return (
				<>
					<div>Customers</div>
					<Table striped bordered hover size='sm' className='customers-table'>
						<thead>
							<tr>
								<th>{'#'} </th>
								{/* Map state's table titles */}
								{this.state.tableTitles.map((h, i) => {
									return (
										<Fragment key={i}>
											<th>{h} </th>
										</Fragment>
									)
								})}
							</tr>
						</thead>
						<tbody>
							{/* Mapping the data which received from db, every document will be a column in the table */}
							{this.state.customers.map((h, i) => {
								return (
									<Fragment key={i}>
										<tr>
											<th>{++i}</th>
											<td>{h['username']}</td>
											<td>{h['email']}</td>
											<td>{h['role']}</td>
										</tr>
									</Fragment>
								)
							})}
						</tbody>
					</Table>
					<Form>
						<Form.Group controlId='exampleForm.ControlTextarea1'>
							<Form.Label>Broadcast message:</Form.Label>
							<Form.Control
								as='textarea'
								rows={3}
								onChange={(e) => {
									this.setState({ textArea: e.target.value })
								}}
							/>
						</Form.Group>
						<Button variant='warning' onClick={this.handleSubmit.bind(this)}>
							Submit
						</Button>
					</Form>
				</>
			)
	}
}
