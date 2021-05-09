import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../../css/homepage.css'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import axios from 'axios'

class HomeContext extends Component {
	constructor(props) {
		super(props)
		this.state = {
			destinations: undefined,
		}

		axios
			.get('/packages')
			.then((response) => {
				const names = response.data.map((pkg) => pkg.name)
				this.setState({ destinations: names })
			})
			.catch((error) => {
				console.log(error)
			})
	}
	render() {
		if (this.state.destinations == undefined)
			return (
				<div className='text-center'>
					<div className='spinner-border' role='status'>
						<span className='sr-only'>Loading...</span>
					</div>
				</div>
			)
		else
			return (
				<>
					<Container fluid>
						<Row>
							<Col sm={2}>
								<ListGroup variant='flush'>
									{this.state.destinations.map((dest, i) => {
										return <ListGroup.Item key={i}>{dest}</ListGroup.Item>
									})}
								</ListGroup>
							</Col>
							<Col sm={10}>map will be here</Col>
						</Row>
					</Container>
				</>
			)
	}
}

export default HomeContext
