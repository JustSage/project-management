import axios from 'axios'
import { Table } from 'react-bootstrap'
import React, { Component, Fragment } from 'react'
import '../../css/orders.css'

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
				//Get fields name, remove _id attribute from the received data
				var arr = Object.keys(response.data[0]).slice(1)
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

		this.sort = this.sort.bind(this)
	}

	/**
	 * Function sorting data by value which selected by the user.
	 * @param {} headerName
	 */
	sort = (headerName) => {
		var temp = this.state.orders.sort(function (a, b) {
			if (a[headerName] < b[headerName]) {
				return -1
			}
			if (a[headerName] > b[headerName]) {
				return 1
			}
			return 0
		})
		console.log(temp)
		this.setState({ orders: temp })
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
								<th>{'#'} </th>
								{/* Map state's table titles */}
								{this.state.tableTitles.map((h, i) => {
									return (
										<Fragment key={i}>
											<th>
												{h}{' '}
												<button
													className='sort-by-btn'
													id={i}
													onClick={() => this.sort(h)}
												>
													v
												</button>
											</th>
										</Fragment>
									)
								})}
							</tr>
						</thead>
						<tbody>
							{/* Mapping the data which received from db, every document will be a column in the table */}
							{this.state.orders.map((h, i) => {
								return (
									<Fragment key={i}>
										<tr>
											<th>{++i}</th>
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
