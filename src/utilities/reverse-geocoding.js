import { OpenStreetMapProvider } from 'leaflet-geosearch'

const provider = new OpenStreetMapProvider()

const geocoding = async (name) => {
	const results = await provider.search({ query: name })
	return results
}

export default geocoding
