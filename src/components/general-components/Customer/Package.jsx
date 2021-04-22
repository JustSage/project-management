import React, { Component } from 'react'
import '../../../css/Package.css'
// import Card from './Package-Components/Card'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import PropTypes from 'prop-types'
/* 
	the main idea behind Package Component:

	this component will represent Packages containing flights and hotels and rent car services in different places.

	it should be a boundle of smaller and reusable components, like card, courusel and much more.

*/
export default class Package extends Component {
	state = {
		name: this.props.name,
		description: this.props.description,
		url: this.props.url,
	}

	// at this part we can make a search in the DB to look for a match -> if we found a match -> add to packages .
	// after we finished with the db check, we need to pass the info we got to the <Card /> component:

	// like this: <Card: locationName= {} context = {} image = {} />

	// after this we will map our elements and display them as jsx.

	render() {
		return <Container>hi</Container>
	}
}

Package.propTypes = {
	name: PropTypes.string,
	description: PropTypes.string,
	url: PropTypes.string,
}
