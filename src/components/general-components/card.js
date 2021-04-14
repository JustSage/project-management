import React from 'react'
import PropTypes from 'prop-types'
const Card = ({ cardTitle, cardContext, cardImage }) => {
	return (
		<div className='card' style={{ width: '18rem' }}>
			<img className='card-img-top' src={cardImage} alt='Card image cap' />
			<div className='card-body'>
				<h5 className='card-title'>{cardTitle}</h5>
				<p className='card-text'>{cardContext}</p>
				<a href='#' className='btn btn-primary'>
					Go somewhere
				</a>
			</div>
		</div>
	)
}

Card.propTypes = {
	cardTitle: PropTypes.string.isRequired,
	cardContext: PropTypes.string.isRequired,
	cardImage: PropTypes.string.isRequired,
}
export default Card
