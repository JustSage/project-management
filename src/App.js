import './css/App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/login-and-signup-components/login'
import Homepage from './components/general-components/homepage'
import SignUp from './components/login-and-signup-components/sign-up'
<<<<<<< HEAD
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCoffee)
=======

>>>>>>> 9500b254e019677c45ad18dc9dada8e996d98c4b
function App() {
	return (
		<>
			<div className='bg'>
				<Router>
					<Switch>
						<Route exact path='/' component={Homepage} />
						<Route path='/login' component={Login} />
						<Route path='/signUp' component={SignUp} />
						<Route path='/homepage' component={Homepage} />
					</Switch>
				</Router>
			</div>
		</>
	)
}

export default App
