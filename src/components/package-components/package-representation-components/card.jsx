import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class Card extends Component {
	render() {
		return (
			<div className='card' style={{ width: '28rem' }}>
				<img
					className='card-img-top'
					src='https://static.remove.bg/remove-bg-web/2a274ebbb5879d870a69caae33d94388a88e0e35/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg'
					alt='Card image cap'
				/>
				<div className='card-body'>
					<h5 className='card-title'>Card title</h5>
					<p className='card-text'>some content</p>
					<a href='#' className='btn btn-primary'>
						Go somewhere
					</a>
				</div>
			</div>
		)
	}
}
