import axios from 'axios'
import { response } from 'express'
import React, { Component } from 'react'
/**
 * Component represents the orders which was made by customers. 
 * Orders will represented with their full details and includes sorting options that will be eased the users to inspect the data.
 */
export default class ordersList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			orders: [],
		}
		axios
			.get('orders')
			.then((response) => {
				this.state.orders.push(response.data.orders)
			})
			.catch((error) => {
				console.log(error.response.data.message)
				alert(error.response.data.message)
			})
	}
	render() {
		return <div>Orders</div>
	}
}
