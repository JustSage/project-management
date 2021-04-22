import axios from 'axios'
import { Table } from 'react-bootstrap'
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
			customers: [],
			tableTitles: undefined,
		}
		axios
			.get('/customers')
			.then((response) => {
				console.log(response.data)
				//Get fields name, remove _id attribute from the received data
				var arr = Object.keys(response.data[0])
					.slice(1)
					.filter(function (value) {
						return value != 'password'
					})
				console.log(arr)
				this.setState({
					tableTitles: arr,
					customers: response.data,
				})
				console.log(this.state.tableTitles, this.state.customers)
			})
			.catch((error) => {
				console.log(error.response.data.message)
				alert(error.response.data.message)
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
				</>
			)
	}
}
