/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../../css/homepage.css'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import axios from 'axios'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { OpenStreetMapProvider } from 'leaflet-geosearch'

const provider = new OpenStreetMapProvider()

class HomeContext extends Component {
	constructor(props) {
		super(props)
		this.state = {
			destinations: undefined,
			latlongs: [],
		}

		axios
			.get('/packages')
			.then((response) => {
				const names = response.data.map((pkg) => pkg.name)
				this.setState({ destinations: names })
				let array = async () => {
					return Promise.all(
						names.map((dest, i) => provider.search({ query: dest }))
					)
				}
				array().then((data) => {
					const filteredArray = data.map((item) => {
						return [[item[0].y, item[0].x], item[0]]
					})
					this.setState({ latlongs: filteredArray })
					console.log(this.state.latlongs)
				})
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
							<Col sm={2} className='dest-text'>
								{'Our Destinations:'}
							</Col>
							<Col sm={10} />
						</Row>
						<Row>
							<Col sm={2}>
								<ListGroup variant='flush' className='dest-list'>
									{this.state.destinations.map((dest, i) => {
										return <ListGroup.Item key={i}>{dest}</ListGroup.Item>
									})}
								</ListGroup>
							</Col>
							<Col sm={10}>
								<MapContainer
									center={[25, 0]}
									zoom={3}
									scrollWheelZoom={false}
									style={{ height: '200%', width: '90%' }}
								>
									<TileLayer
										attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
										url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
									/>
									{this.state.latlongs.map((item, i) => {
										return (
											<Marker key={i} position={item[0]}>
												<Popup>{`${item[1].label}`}</Popup>
											</Marker>
										)
									})}
								</MapContainer>
							</Col>
						</Row>
					</Container>
				</>
			)
	}
}

export default HomeContext
