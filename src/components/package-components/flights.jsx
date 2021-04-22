import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
/*
    the idea behind this component is:

    a list of available flight deals to various of places around the world.

    from my perspective (Dave), it should be a boundle of much smaller components, like a Calendar, courosel of flights, form, and more.
*/
export default class Flights extends Component {
	state = {
		topicId: useParams(),
	}
	render() {
		return <Container>flights {this.state.topicId}</Container>
	}
}
