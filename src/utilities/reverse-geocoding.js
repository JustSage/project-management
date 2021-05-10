import Geocode from 'react-geocode'

export default function geocoding(name) {
  let data
  Geocode.fromAddress(name).then(
    (response) => {
      data = response.results[0].geometry.location
      console.log(data)
    },
    (error) => {
      console.error(error)
    }
  )
  return data
}
