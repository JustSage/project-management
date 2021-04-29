/* eslint-disable constructor-super */
import React, { Component } from 'react'

/**
 * Component will called when non-authenticated user try to reach to one of the pages which demands authentication
 */
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
