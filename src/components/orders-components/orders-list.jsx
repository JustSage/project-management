import axios from 'axios'
import { Table, Button } from 'react-bootstrap'
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
			temp: [],
			tableTitles: undefined,
			searchValue: '',
		}
		axios
			.get('/orders')
			.then((response) => {
				//Get fields name, remove _id attribute from the received data
				var arr = Object.keys(response.data[0]).slice(1)

				arr[4] = 'Order date'
				this.setState({
					tableTitles: arr,
					orders: response.data,
				})
				// console.log(this.state.tableTitles, this.state.orders)
			})
			.catch((error) => {
				console.log(error.response)
				alert(error.response)
			})

		this.sort = this.sort.bind(this)
		this.filterOrders = this.filterOrders.bind(this)
	}

	handleAccept = (userName) => {
		axios
			.post('/update-order-status', {
				User: userName,
				Status: 'Accepted',
			})
			.then((response) => {
				alert(response.data.message)
			})
			.catch((error) => {
				alert(error)
				console.log(error)
			})
	}

	handleAcceptAll = () => {
		axios
			.post('/update-all-ordes-statuses', {
				Status: 'Accepted',
			})
			.then((response) => {
				alert(response.data.message)
			})
			.catch((error) => {
				alert(error.data.message)
				console.log(error.data.message)
			})
	}

	/**
	 * Function filter the orders (State variable) according to search input text
	 */
	filterOrders = (event) => {
		this.setState({ searchValue: event.target.value })
	}

	/**
	 * Function sorting data by value which selected by the user.
	 * @param {} headerName
	 */
	sort = (headerName) => {
		var temp
		//Sort from most recent to earlier if sort by date selected
		if (
			headerName == 'Order date' ||
			headerName == 'Start' ||
			headerName == 'End'
		) {
			temp = this.state.orders.sort(function (a, b) {
				return new Date(b[headerName]) - new Date(a[headerName])
			})
		} else {
			temp = this.state.orders.sort(function (a, b) {
				if (a[headerName] < b[headerName]) {
					return -1
				}
				if (a[headerName] > b[headerName]) {
					return 1
				}
				return 0
			})
		}
		console.log(temp)
		this.setState({ orders: temp })
	}

	render() {
		if (this.state.tableTitles === undefined) {
			return (
				<div className='text-center'>
					<div className='spinner-border' role='status'>
						<span className='sr-only'>Loading...</span>
					</div>
				</div>
			)
		} else
			return (
				<>
					<div className='package'>
						<div className='wrraper'>
							<label className='packageLabel' htmlFor='location'>
								Search order:
							</label>
							<input
								onChange={this.filterOrders}
								className='packageInput'
								id='location'
							/>
						</div>
						<br />
					</div>
					<Table striped bordered hover size='sm' className='orders-table'>
						<thead>
							<tr>
								<th>{'#'} </th>
								{/* Map state's table titles */}
								{}
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
								<th>{'Approve'} </th>
							</tr>
						</thead>
						<tbody>
							{/* Mapping the data which received from db, every document will be a column in the table */}
							{this.state.orders
								.filter(
									(h) =>
										h['OrderName'].includes(this.state.searchValue) ||
										h['Destination'].includes(this.state.searchValue)
								)
								.map((h, i) => {
									return (
										<Fragment key={i}>
											<tr>
												<th>{++i}</th>
												<td>{h['OrderName']}</td>
												<td>{h['User']}</td>
												<td>{h['Destination']}</td>
												<td>{h['Price']}</td>
												<td>{h['Deal']}</td>
												<td>{h['Status']}</td>
												<td>{h['OrderDate']}</td>
												<td>{h['VacationDate']}</td>
												<td>
													<Button
														onClick={() => {
															this.handleAccept(h['User'])
														}}
													>
														Accept
													</Button>
												</td>
											</tr>
										</Fragment>
									)
								})}
						</tbody>
					</Table>
					<Button onClick={this.handleAcceptAll}>Accpet All</Button>
				</>
			)
	}
}
