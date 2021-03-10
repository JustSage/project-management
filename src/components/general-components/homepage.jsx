/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import Navbar1 from './navbar'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'

library.add(fab, faCheckSquare, faCoffee, faUser)



class Homepage extends Component {
	constructor(props) {
		super(props)
	}

	logoutClick=()=>{
		sessionStorage.removeItem('logged-in-username')
		this.props.history.push('/')
	}

	render() {
		if (sessionStorage.getItem('logged-in-username'))
		{
		return (
			<div className='containter' style={{display:'flex',flexDirection:'row'}}>
				<div className='row' style={{flex:1}}>
					<div className='col-xs-12'>
						<Navbar1/>
					</div>
				</div>
				<div className='col-xs-12' style={{flex:1}}>
						<h3>Home Page</h3>			
				</div>
				<div style={{display:'flex'}}>
				<h5><FontAwesomeIcon icon='user' style={{marginTop:10}}></FontAwesomeIcon> Welcome {sessionStorage.getItem('logged-in-username')}</h5>
				<Button variant="warning" size='sm' style={{marginLeft:15, marginTop:5, marginRight:3, fontWeight:'bold'}} onClick={()=>this.logoutClick()}>Log out</Button>
				</div>
			</div>
		)}
		else {
			return (
				<>
					<h2>You have no permission to visit this page, please <a href="/">Log-in</a></h2> 
				</>
			)
		}
	}
}

export default Homepage

// const myStyle = {
// 	backgroundImage: 'url("images/background_orange.png")',
// 	backgroundSize: 'cover',
//     height:'100%',
// }
