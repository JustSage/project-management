// import React, { Component } from 'react'
// import { Modal } from 'react-bootstrap'
// const { MongoClient } = require('mongodb')
// const URL = process.env.MONGODB_URL

// MongoClient.connect(URL, async (error, client) => {
// 	if (error) throw error
// 	var customers = client.db(process.env.DATABASE_NAME)
// 	customers
// 		.collection('customers')
// 		.find({ role: 'Customer' })
// 		.toArray(function (error, result) {
// 			if (error) throw error
// 			console.log(result)
// 			customers.close()
// 		})
// })

// function CustomerServiceModal(props) {
// 	return (
// 		<Modal
// 			{...props}
// 			size='lg'
// 			aria-labelledby='contained-modal-title-vcenter'
// 			centered
// 		>
// 			<Modal.Header closeButton>
// 				<Modal.Title id='contained-modal-title-vcenter'>
// 					Agent's Customer Service Modal
// 				</Modal.Title>
// 			</Modal.Header>
// 			<Modal.Body>
// 				<h4>Customer List</h4>
// 				<div>
// 					{customers.map(function (customer, index) {
// 						return <li key={index}>{customer}</li>
// 					})}
// 				</div>
// 			</Modal.Body>
// 			<Modal.Footer>
// 				<Button onClick={props.onHide}>Close</Button>
// 			</Modal.Footer>
// 		</Modal>
// 	)
// }

// function App() {
// 	const [modalShow, setModalShow] = React.useState(false)

// 	return (
// 		<>
// 			<Button variant='primary' onClick={() => setModalShow(true)}>
// 				Customer List
// 			</Button>

// 			<CustomerServiceModal
// 				show={modalShow}
// 				onHide={() => setModalShow(false)}
// 			/>
// 		</>
// 	)
// }

// render(<App />)

// /* The main idea for this components:
//    A list of Customers which will be represented to the Travel agent/Admin.

//    in this conponent, you can choose a customer, and represent this data near the list (beneath or next to it.

//     the list can be displayed as a combobox or something -> be creative.
//     */
// class CustomersList extends Component {
// 	render() {
// 		<div>List Of Customers</div>
// 	}
// }

// export default CustomersList
