/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import NavbarComponent from '../general-components/navbar'
import Sidebar from '../general-components/sidebar'
import axios from 'axios'

class Template extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<>
				<div className='row hp-divs'>
					<div className='col-xs-12'></div>
				</div>
				<h3>Template</h3>
			</>
		)
	}
}

export default Template
