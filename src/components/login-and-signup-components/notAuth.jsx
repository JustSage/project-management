/* eslint-disable constructor-super */
import React, { Component } from 'react'

export default class NotAuth extends Component {
	render() {
		return (
			<>
				<h2>
					You have no permission to visit this page, please{' '}
					<a href='/'>Log-in</a>
				</h2>
			</>
		)
	}
}
