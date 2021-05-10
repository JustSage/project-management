/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../../css/homepage.css'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import axios from 'axios'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

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
							<Col sm={10}>
								<MapContainer
									center={[51.505, -0.09]}
									zoom={3}
									scrollWheelZoom={false}
									style={{ height: '500%', width: '90%' }}
								>
									<TileLayer
										attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
										url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
									/>
									<Marker position={[51.505, -0.09]}>
										<Popup>
											A pretty CSS3 popup. <br /> Easily customizable.
										</Popup>
									</Marker>
								</MapContainer>
							</Col>
						</Row>
					</Container>
				</>
			)
	}
}

export default HomeContext
