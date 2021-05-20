import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal, Table } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import '../../css/inbox.css'

function Inbox() {
	const [data, setData] = useState(undefined)
	const [show, setShow] = useState(false)
	const [subject, setSubject] = useState('')
	const [source, setSource] = useState('')
	const [content, setContent] = useState('')

	useEffect(() => {
		/**
		 * getting the messages from the DB, filteres them and returns only the messages that are for the logged in user
		 */
		axios
			.get('/messages')
			.then((response) => {
				var filteredMail = response.data.filter((msg) => {
					return msg.DestEmail === sessionStorage.getItem('logged-in-email')
				})
				setData(filteredMail)
				console.log(response.data)
			})
			.catch((error) => {
				console.log(error.response.data.message)
				alert(error.response.data.message)
			})
	}, [])

	const handleClose = () => {
		/**
		 * turnes off the modal and refreshes the page to reload the updated notification
		 */
		setShow(false)
		window.location.reload(false)
	}
	const handleClick = (sbj, src, cont) => {
		/**
		 * Sending post request to mark the message as read, changing the state to see the message on the modal and triggers the modal
		 */
		axios
			.post('/set-read', {
				Subject: sbj,
				Message: cont,
			})
			.then(() => {
				setSubject(sbj)
				setSource(src)
				setContent(cont)
				setShow(true)
			})
			.catch((error) => {
				alert(error)
				console.log(error)
			})
	}

	const getMessageModal = () => {
		/**
		 * Rendering the modal
		 */
		return (
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{subject}</Modal.Title>
				</Modal.Header>
				<Modal.Body className='modal-dialog'>
					<div>
						<div>
							<label>From: </label> {source}
						</div>
						<div>
							<label>Message: </label>
							<label>{content}</label>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Link to={`/reply/${source}/${subject}`}>
						<Button
							variant='secondary'
							onClick={() => {
								handleClose
							}}
						>
							Reply
						</Button>
					</Link>
					<Button variant='primary' onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		)
	}

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
								<tr
									key={index}
									onClick={() => {
										handleClick(msg.Subject, msg.SourceEmail, msg.Message)
									}}
								>
									{msg.Read == false ? (
										<>
											<td>
												<b>{index}</b>
											</td>
											<td>
												<b>{msg.Subject}</b>
											</td>
											<td>
												<b>{msg.SourceEmail}</b>
											</td>
										</>
									) : (
										<>
											<td>{index}</td>
											<td>{msg.Subject}</td>
											<td>{msg.SourceEmail}</td>
										</>
									)}
								</tr>
							)
						})}
					</tbody>
				</Table>
				{getMessageModal()}
			</>
		)
	}
}

export default Inbox
