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
		demoCustomers: [
			{
				fullName: 'David Charon-Zade',
				destination: 'Canada',
				deal: 'Package',
				price: '1000$',
			},
			{
				fullName: 'Yehonatan Ben',
				destination: 'Canada',
				deal: 'Flght',
				price: '1000$',
			},
			{
				fullName: 'Ariel Turchinsky',
				destination: 'Canada',
				deal: 'Package',
				price: '1000$',
			},
			{
				fullName: 'Saggy Balls',
				destination: 'Canada',
				deal: 'Flight',
				price: '1000$',
			},
		],
	}

	componentDidMount() {
		axios
			.get('/pending-reservations')
			.then((response) => {
				this.setState({
					data: response.data,
				})
			})
			.catch((error) => {
				console.log(error.response.data.message)
				alert(error.response.data.message)
			})
	}

	handleAccept = (index) => {
		let temp = this.state.demoCustomers
		temp.splice(index, 1)
		this.setState({ demoCustomers: temp })
	}

	acceptAll = () => {
		// logic for empty the db
		let temp
		while (this.state.demoCustomers.length > 0) {
			temp = this.state.demoCustomers
			temp.pop()
		}
		this.setState({ demoCustomers: temp })
	}
	render() {
		return (
			<div>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Full Name</th>
							<th>Destination</th>
							<th>Deal</th>
							<th>Price</th>
							<th>Approve</th>
						</tr>
					</thead>
					<tbody>
						{this.state.demoCustomers.map((element, index) => {
							return (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{element.fullName}</td>
									<td>{element.destination}</td>
									<td>{element.deal}</td>
									<td>{element.price}</td>
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
				<Button onClick={this.acceptAll}>Accpet All</Button>
			</div>
		)
	}
}
