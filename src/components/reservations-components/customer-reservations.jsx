import React, { Component, Fragment } from 'react'
import { Container, Table, Row } from 'react-bootstrap'

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
				this.setState({ data: response.data }, () => {
					console.log(response.data)
				})
			})
			.catch((error) => {
				console.log(error.response.data.message)
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
