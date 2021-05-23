import React, { Component, Fragment } from 'react'
import { Container, Table, Row, Button } from 'react-bootstrap'

import axios from 'axios'
export default class CustomeReservations extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: undefined,
		}
	}

	componentDidMount() {
		axios
			.get('/customer-orders', {
				params: {
					User: sessionStorage.getItem('logged-in-username'),
				},
			})
			.then((response) => {
				this.setState({ data: response.data })
			})
			.catch((error) => {
				alert(error.response.data.message)
			})
	}

	fetchAgain = () => {
		axios
			.get('/customer-orders', {
				params: {
					User: sessionStorage.getItem('logged-in-username'),
				},
			})
			.then((response) => {
				this.setState({ data: response.data }, () => {})
			})
			.catch((error) => {
				alert(error.response.data.message)
			})
	}

	cancelOrder = (name, user) => {
		axios
			.get('/one-package-destination', {
				params: {
					name: name,
				},
			})
			.then((response) => {
				this.setState({ data: response.data })

				let quantity = this.state.data[0].quantity
				if (quantity >= 0) {
					axios
						.post('/increment-quantity', {
							destination: name,
							quantity: quantity,
						})
						.then((response) => {
							alert(response.data.message)
							axios
								.post('/update-order-status-canceled', {
									Destination: name,
									User: user,
									Status: 'Canceled',
								})
								.then((response) => {
									alert(response.data.message)
								})
								.catch((error) => {
									alert(error.data.message)
								})
						})
						.catch((error) => {
							alert(error.data.message)
						})
				}
			})
			.catch((error) => {
				alert(error.response.data.message)
			})
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
				<Container>
					{() => {
						this.fetchAgain()
					}}
					{/* <Row>
						<h3>Here you could see your Reservations:</h3>
					</Row> */}
					<Row>
						<Table striped bordered hover size='sm' className='orders-table'>
							<thead>
								<tr>
									<th>{'#'} </th>
									<th>{'User'} </th>
									<th>{'Destination'} </th>
									<th>{'Price'} </th>
									<th>{'Deal'} </th>
									<th>{'Status'} </th>
									<th>{'Order Date'} </th>
									<th>{'Start'} </th>
									<th>{'End'} </th>
									<th>{'Cancel'} </th>
								</tr>
							</thead>
							<tbody>
								{this.state.data.map((element, index) => {
									return (
										<Fragment key={index}>
											<tr>
												<th>{++index}</th>
												<td>{element.User}</td>
												<td>{element.Destination}</td>
												<td>{element.Price}</td>
												<td>{element.Deal}</td>
												<td>{element.Status}</td>
												<td>{element.OrderDate}</td>
												<td>{element.Start}</td>
												<td>{element.End}</td>
												<td>
													{element.Status === 'Canceled' ? (
														<Button
															disabled
															onClick={() => {
																this.cancelOrder(
																	element.Destination,
																	element.User
																)
															}}
														>
															Cancel
														</Button>
													) : (
														<Button
															onClick={() => {
																this.cancelOrder(
																	element.Destination,
																	element.User
																)
															}}
														>
															Cancel
														</Button>
													)}
												</td>
											</tr>
										</Fragment>
									)
								})}
							</tbody>
						</Table>
					</Row>
				</Container>
			)
	}
}
