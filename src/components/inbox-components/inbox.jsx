import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal, Table } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from 'sweetalert'
import '../../css/inbox.css'

library.add(faTrashAlt)

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
				setData(filteredMail.reverse())
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

	const handleDelete = (id) => {
		/**
		 * Sending a post request to delete the selected message from the DB
		 */
		swal({
			title: 'Are you sure?',
			text: 'Once deleted, you will not be able to recover this message!',
			icon: 'warning',
			buttons: true,
		}).then((willDelete) => {
			if (willDelete) {
				axios
					.get(`/delete-message/${id}`)
					.then((response) => {
						swal({
							title: response.data.message,
							icon: 'success',
						}).then((ok) => {
							if (ok) {
								window.location.reload(false)
							}
						})
					})
					.catch((error) => {
						swal({
							title: 'Error',
							text: error,
							icon: 'error',
						})
						console.log(error)
					})
			}
		})
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
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{data.map((msg, index) => {
							return (
								<tr key={index}>
									{msg.Read == false ? (
										<>
											<td
												onClick={() => {
													handleClick(msg.Subject, msg.SourceEmail, msg.Message)
												}}
											>
												<b>{index}</b>
											</td>
											<td
												onClick={() => {
													handleClick(msg.Subject, msg.SourceEmail, msg.Message)
												}}
											>
												<b>{msg.Subject}</b>
											</td>
											<td
												onClick={() => {
													handleClick(msg.Subject, msg.SourceEmail, msg.Message)
												}}
											>
												<b>{msg.SourceEmail}</b>
											</td>
											<td
												onClick={() => {
													handleDelete(msg._id)
												}}
											>
												<b>
													<FontAwesomeIcon className='trash' icon='trash-alt' />
												</b>
											</td>
										</>
									) : (
										<>
											<td
												onClick={() => {
													handleClick(msg.Subject, msg.SourceEmail, msg.Message)
												}}
											>
												{index}
											</td>
											<td
												onClick={() => {
													handleClick(msg.Subject, msg.SourceEmail, msg.Message)
												}}
											>
												{msg.Subject}
											</td>
											<td
												onClick={() => {
													handleClick(msg.Subject, msg.SourceEmail, msg.Message)
												}}
											>
												{msg.SourceEmail}
											</td>
											<td
												onClick={() => {
													handleDelete(msg._id)
												}}
											>
												<FontAwesomeIcon
													className='trash'
													icon='trash-alt'
												></FontAwesomeIcon>
											</td>
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
