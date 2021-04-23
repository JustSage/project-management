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
				id: 1,
				fullName: 'David Charon-Zade',
				Destination: 'Canada',
				Price: '1000$',
			},
			{
				id: 2,
				fullName: 'Yehonatan Ben',
				Destination: 'Canada',
				Price: '1000$',
			},
			{
				id: 3,
				fullName: 'Ariel Turchinsky',
				Destination: 'Canada',
				Price: '1000$',
			},
			{ id: 4, fullName: 'Saggy Balls', Destination: 'Canada', Price: '1000$' },
		],
	}

	componentDidMount() {
		axios.get('/pending-reservations').then((response) => {
			this.setState({
				data: response.data,
			})
		})
		// .catch((error) => {
		// 	console.log(error.response.data.message)
		// 	alert(error.response.data.message)
		// })
	}

	handleAccept = (index) => {
		let temp = this.state.demoCustomers
		temp.splice(index, 1)
		console.log(temp)

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
							<th>Price</th>
							<th>Destination</th>
							<th>Approve</th>
						</tr>
					</thead>
					<tbody>
						{this.state.demoCustomers.map((element, index) => {
							return (
								<tr key={element.fullName}>
									<td>{index + 1}</td>
									<td>{element.fullName}</td>
									<td>{element.Price}</td>
									<td>{element.Destination}</td>
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
			</div>
		)
	}
}
