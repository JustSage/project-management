/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import NavbarComponent from '../general-components/navbar'
import axios from 'axios'

class Template extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<>
				<NavbarComponent history={this.props.history} />

				<div className='row hp-divs'>
					<div className='col-xs-12'>
						<h3>side bar was here, now its not!</h3>
					</div>
				</div>
				<h3>Template</h3>
			</>
		)
	}
}

export default Template
