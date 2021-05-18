import React, { useState } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function Inbox() {
	const [data, setData] = useState(undefined)
	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)
	axios
		.get('/messages')
		.then((response) => {
			setData(response.data)
			console.log(response.data)
		})
		.catch((error) => {
			console.log(error.response.data.message)
			alert(error.response.data.message)
		})

	if (data === undefined) {
		return (
			<div className='text-center'>
				<div className='spinner-border' role='status'>
					<span className='sr-only'>Loading...</span>
				</div>
			</div>
		)
	} else {
		return (
			<>
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Message</Modal.Title>
					</Modal.Header>
					<Modal.Body>Woohoo, youre reading this text in a modal!</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={handleClose}>
							Close
						</Button>
						<Button variant='primary' onClick={handleClose}>
							Save Changes
						</Button>
					</Modal.Footer>
				</Modal>
				<h1 align='center'>Inbox</h1>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Subject</th>
							<th>From</th>
						</tr>
					</thead>
					<tbody>
						{data.map((msg, index) => {
							return (
								<tr key={index} onClick={handleShow}>
									<td>{index}</td>
									<td>{msg.Subject}</td>
									<td>{msg.SourceEmail}</td>
								</tr>
							)
						})}
					</tbody>
				</Table>
			</>
		)
	}
}

export default Inbox
