/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../../css/homepage.css'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import axios from 'axios'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'

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
				const names = response.data
					.filter((pkg) => pkg.rating >= 3)
					.map((pkg) => pkg.name)
				this.setState({ destinations: names.slice(0, 7) })
				let array = async () => {
					return Promise.all(
						names.map((dest, i) => provider.search({ query: dest }))
					)
				}
				array().then((names) => {
					const filteredArray = names.map((item) => {
						return [[item[0].y, item[0].x], item[0]]
					})
					this.setState({ latlongs: filteredArray })
				})
			})
			.catch((error) => {
				alert('Error in loading data!')
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
					<Container fluid style={{ width: '90%', height: '90%' }}>
						<Row>
							<Col sm={2} className='dest-text'>
								{'Some Of Our Recommended Destinations:'}
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
									style={{ height: '400px', width: '1000px' }}
								>
									<TileLayer
										attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
										url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
										// crossOrigin={null}
									/>
									{this.state.latlongs.map((item, i) => {
										setTimeout(() => {}, 10001)
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
