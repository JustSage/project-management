import react from 'react'
import '../../css/search-bar.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(faSearch)

class SearchBar extends react.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: 'undefined',
			chosenPkg: undefined,
			currentPackage: undefined,
		}
		axios
			.get('/packages')
			.then((response) => {
				this.setState(
					{
						data: response.data,
					},
					() => {
						console.log(this.state.data)
					}
				)
			})
			.catch((error) => {
				console.log(error.response.data.message)
				alert(error.response.data.message)
			})
	}

	onPkgClick = (pkg) => {
		this.setState({
			chosenPkg: pkg,
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
					<input
						type='search'
						placeholder='Search for packages...'
						className='search-input'
						list='cityname'
					/>
					<datalist id='cityname'>
						{this.state.data.map((pkg) => {
							return (
								<div key={pkg.description}>
									<option
										onClick={this.setState({ currentPackage: pkg })}
										value={pkg.name}
									>
										{pkg.price}
									</option>
								</div>
							)
						})}
					</datalist>
					<Link
						to={{
							pathname: `/search-results/${this.state.currentPackage.name}/${this.state.currentPackage.price}/${this.state.currentPackage.description}/${this.state.currentPackage.quantity}/${this.state.currentPackage.dates}`,
						}}
					>
						<FontAwesomeIcon
							className='glass'
							size='lg'
							icon='search'
						></FontAwesomeIcon>
					</Link>
				</>
			)
		}
	}
}

export default SearchBar
