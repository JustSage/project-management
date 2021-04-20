import axios from 'axios'
import { Table } from 'react-bootstrap'
import React, { Component, Fragment } from 'react'
import '../../../css/orders.css'
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
			tableTitles: undefined,
		}
		axios
			.get('/orders')
			.then((response) => {
				console.log(response.data)
				//Get fields name
				var arr = Object.keys(response.data[0]).slice(1)
				arr.reverse()
				arr.push('#')
				arr.reverse()
				this.setState({
					tableTitles: arr,
					orders: response.data,
				})
				console.log(this.state.tableTitles, this.state.orders)
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
					<div>Orders</div>
					<Table striped bordered hover size='sm' className='orders-table'>
						<thead>
							<tr>
								{this.state.tableTitles.map((h, i) => {
									return (
										<Fragment key={i}>
											<th>{h}</th>
										</Fragment>
									)
								})}
							</tr>
						</thead>
						<tbody>
							{this.state.orders.map((h, i = 1) => {
								return (
									<Fragment key={i++}>
										<tr>
											<td>{i}</td>
											<td>{h['name']}</td>
											<td>{h['date']}</td>
											<td>{h['package number']}</td>
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
