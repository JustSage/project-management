import './css/App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/login-and-signup-components/login'
import Homepage from './components/general-components/homepage'
import SignUp from './components/login-and-signup-components/sign-up'

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={Login} />
				<Route exact path='/SignUp' component={SignUp} />
				<Route path='/homepage' component={Homepage} />
			</Switch>
		</Router>
	)
}

export default App
