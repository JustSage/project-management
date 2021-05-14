/* eslint-disable react/prop-types */
import React, { Component } from 'react'

class SearchResults extends Component {
	constructor(props) {
		super(props)
		this.state = {
			package: '',
		}
	}
	render() {
		const nahuy = this.props.location
		console.log(nahuy)
		return <h1>Search Reasults</h1>
	}
}

export default SearchResults
