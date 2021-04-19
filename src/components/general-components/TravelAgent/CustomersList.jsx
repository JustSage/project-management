import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
/* eslint-disable react/prop-types */

/**
 * CustomerServiceModal is a react-bootstrap component modified to present a list of customers.
 * We will implement various features for travel agents to be used within the modal itself,
 * aiding them with customer service features.
 *
 * @param {*} props recieves properties given in component construction.
 */
class CustomersList extends Component {
	constructor(props) {
		super(props)
		axios
			.get('/customers', { headers: { 'content-type': 'application/json' } })
			.then((response) => {
				console.log(response)
			})
			.catch((error) => {
				console.log(error.response)
				alert(error.response.data.message)
			})

		return (
			<Modal
				{...props}
				size='lg'
				aria-labelledby='contained-modal-title-vcenter'
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>
						{"Agent's Customer Service Modal"}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h4>Customer List</h4>
					{/* <div>
						{customers.map(function (customer, index) {
							return <li key={index}>{customer}</li>
						})}
					</div> */}
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={props.onHide}>Close</Button>
				</Modal.Footer>
			</Modal>
		)
	}
	render() {
		const [modalShow, setModalShow] = React.useState(false)
		return (
			<>
				<Button variant='primary' onClick={() => setModalShow(true)}>
					{' '}
					Launch vertically centered modal{' '}
				</Button>

				<CustomersList show={modalShow} onHide={() => setModalShow(false)} />
			</>
		)
	}
}

export default CustomersList
