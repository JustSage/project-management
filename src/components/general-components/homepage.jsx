/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import Navbar1 from './navbar'

class Homepage extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className='containter'>
				<div className='row'>
					<div className='col-xs-12'>
						<Navbar1></Navbar1>
					</div>
					<div className='col-xs-12'>
						<h3>Home Page</h3>
					</div>
				</div>
			</div>
		)
	}
}

export default Homepage

// const myStyle = {
// 	backgroundImage: 'url("images/background_orange.png")',
// 	backgroundSize: 'cover',
//     height:'100%',
// }
