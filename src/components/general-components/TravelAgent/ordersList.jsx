import axios from 'axios'
import { Table } from 'react-bootstrap'
import React, { Component } from 'react'
/**
 * Component represents the orders which was made by customers.
 * Orders will represented with their full details and includes sorting options that will be eased the users to inspect the data.
 *
 */
export default class OrdersList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			orders: [],
		}
		axios
			.get('/orders', { headers: { 'content-type': 'application/json' } })
			.then((response) => {
				console.log(response.data)
				this.state.orders.push(response.data.orders)
			})
			.catch((error) => {
				console.log(error.response.data.message)
				alert(error.response.data.message)
			})
	}
	render() {
		return (
			<>
				<div>Orders</div>
				<Table striped bordered hover size='sm'>
					<thead>
						<tr>
							<th>#</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Username</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td>Mark</td>
							<td>Otto</td>
							<td>@mdo</td>
						</tr>
						<tr>
							<td>2</td>
							<td>Jacob</td>
							<td>Thornton</td>
							<td>@fat</td>
						</tr>
						<tr>
							<td>3</td>
							<td colSpan='2'>Larry the Bird</td>
							<td>@twitter</td>
						</tr>
					</tbody>
				</Table>
			</>
		)
	}
}
