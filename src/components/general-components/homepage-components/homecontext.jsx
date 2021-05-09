/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../../css/homepage.css'
import { Container, Row, Col } from 'react-bootstrap'

class HomeContext extends Component {
	render() {
		return (
			<>
				<Container fluid>
					<Row>
						<Col sm={2}>list will be here</Col>
						<Col sm={10}>map will be here</Col>
					</Row>
				</Container>
			</>
		)
	}
}

export default HomeContext
