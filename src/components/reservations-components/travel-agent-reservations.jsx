import React, { Component } from 'react'
import axios from 'axios'
import { Table, Button } from 'react-bootstrap'
/*
 travel agent need this component becaouse he will receive notifications about reservations that the customers made by ordering something, and here he will approve them. 

 from here we will send a message to the customer-reserrvation.jsx that the TA approved the reservation.
*/

export default class TAReservations extends Component {
	constructor(props) {
		super(props)

		this.handleAccept = this.handleAccept.bind(this)
	}

	state = {
		data: undefined,
	}

	componentDidMount() {
		axios
			.get('/orders')
			.then((response) => {
				this.setState(
					{
						data: response.data,
					},
					() => {
						console.log(this.state.data)
					}
				)
			})
			.catch((error) => {
				alert(`error: ${error.response.data}`)
			})
	}

	handleAccept = (index) => {
		let temp = this.state.demoCustomers
		temp.splice(index, 1)
		this.setState({ demoCustomers: temp })
	}

	handleAcceptAll = () => {
		// logic for empty the db
		let temp
		while (this.state.demoCustomers.length > 0) {
			temp = this.state.demoCustomers
			temp.pop()
		}
		this.setState({ demoCustomers: temp })
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
		} else
			return (
				<div>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Full Name</th>
								<th>Destination</th>
								<th>Price</th>
								<th>Deal</th>
								<th>Status</th>
								<th>Order Date</th>
								<th>Start</th>
								<th>End</th>
								<th>Approve</th>
							</tr>
						</thead>
						<tbody>
							{this.state.data.map((element, index) => {
								return (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{element.User}</td>
										<td>{element.Destination}</td>
										<td>{element.Price}</td>
										<td>{element.Deal}</td>
										<td>{element.Status}</td>
										<td>{element.OrderDate}</td>
										<td>{element.Start}</td>
										<td>{element.End}</td>
										<td>
											<Button
												onClick={() => {
													this.handleAccept(index)
												}}
											>
												Accept
											</Button>
										</td>
									</tr>
								)
							})}
						</tbody>
					</Table>
					<Button onClick={this.handleAcceptAll}>Accpet All</Button>
				</div>
			)
	}
}
