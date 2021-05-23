import axios from 'axios'
import { Table, Form, Button } from 'react-bootstrap'
import React, { Component, Fragment } from 'react'
import swal from 'sweetalert'
import '../../css/customerList.css'

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
				alert(error.response.data.message)
			})
	}

	handleSubmit = () => {
		let emails = []
		for (let i = 0; i < this.state.customers.length; ++i) {
			emails.push(this.state.customers[i].email)
		}
		axios
			.post('/send-broadcast-email', {
				emails: emails,
				text: this.state.textArea,
			})
			.then(() => {
				swal({
					title: 'Broadcast Email',
					text: 'Email sent successfully!',
					icon: 'success',
				})
			})
			.catch(() => {
				swal({
					title: 'Broadcast Email',
					text: 'email did not sent successfully!',
					icon: 'error',
				})
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
											<th style={{ height: '40px' }}>{h} </th>
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
											<th style={{ width: '50px' }}>{++i}</th>
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
						<Form.Group controlId='textArea'>
							<Form.Label className='label-customer'>
								Broadcast message:
							</Form.Label>
							<Form.Control
								as='textarea'
								className='message-customer'
								rows={3}
								onChange={(e) => {
									this.setState({ textArea: e.target.value })
								}}
							/>
						</Form.Group>
						<Button
							className='textButton'
							variant='primary'
							onClick={this.handleSubmit.bind(this)}
						>
							Send
						</Button>
					</Form>
				</>
			)
	}
}
