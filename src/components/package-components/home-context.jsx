import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
/* 
	The main idea behind HomeContext Component:

	this will be the default page of "Homepage"
	
	it can be a boundle of few components together, like "reccomended flights" + "best prices for rental cars " and so on, 

	you can put original content this this compoenent as you wish, (something that will be only in the home page)
	
*/
export default class HomeContext extends Component {
	render() {
		return <Container>Home context</Container>
	}
}
