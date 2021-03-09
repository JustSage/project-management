/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import Navbar1 from './navbar'
class Homepage extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div style={myStyle}>
				<Navbar1 />
				<br />
				<h1>Im home!</h1>
			</div>
		)
	}
}

export default Homepage


const myStyle = {
	backgroundImage: 'url("images/background_orange.png")',
	backgroundSize: 'cover',
    height:'100%',
}