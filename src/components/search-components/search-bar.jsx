import react from 'react'
import '../../css/search-bar.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { Form } from 'react-bootstrap'

library.add(faSearch)

class SearchBar extends react.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
			chosenPkg: undefined,
			flag: false,
		}
	}

	componentDidMount() {
		axios
			.get('/packages')
			.then((response) => {
				this.setState({
					data: response.data,
				})
			})
			.catch((error) => {
				alert(error.response.data.message)
			})
	}

	onPkgClick = (event) => {
		axios
			.get('/one-package-destination', {
				params: {
					name: event.target.value,
				},
			})
			.then((response) => {
				this.setState({ chosenPkg: response.data, flag: true })
			})
			.catch((error) => {
				alert(error.response.data.message)
			})
	}

	render() {
		if (this.state.data === undefined) {
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
					<Form.Group controlId='bla'>
						<Form.Control
							className='search-input'
							as='select'
							onChange={this.onPkgClick.bind(this)}
							defaultValue='search here'
						>
							{this.state.data.map((pkg) => {
								return (
									<option value={pkg.name} key={pkg.name}>
										{pkg.name}
									</option>
								)
							})}
						</Form.Control>
					</Form.Group>

					{this.state.flag === true ? (
						<Link
							to={{
								pathname: `/search-results/${this.state.chosenPkg.name}/${this.state.chosenPkg.price}/${this.state.chosenPkg.description}/${this.state.chosenPkg.quantity}/${this.state.chosenPkg.dates}`,
							}}
						>
							<FontAwesomeIcon
								className='glass'
								size='lg'
								icon='search'
							></FontAwesomeIcon>
						</Link>
					) : (
						<Link>
							<FontAwesomeIcon
								disabled
								className='glass'
								size='lg'
								icon='search'
							></FontAwesomeIcon>
						</Link>
					)}
				</>
			)
		}
	}
}

export default SearchBar
