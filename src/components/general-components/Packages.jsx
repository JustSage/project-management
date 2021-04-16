/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import NavbarComponent from '../general-components/navbar'
import Sidebar from '../general-components/sidebar'
import Package from './Customer/Package'
import { Container } from 'react-bootstrap'
/**
 * Packages page which appears as navbar tag, when click on the navbar button it'll be redirecting here
 * by routing. This page includes the package-components.
 */
class Packages extends Component {
	render() {
		return (
			<>
				<NavbarComponent history={this.props.history} />

				<div className='row hp-divs'>
					<div className='col-xs-12'>
						<Sidebar history={this.props.history} />
					</div>
				</div>
				<h3>Packages</h3>
				<Container>
					<Package />
				</Container>
			</>
		)
	}
}

export default Packages
