import  { useState } from 'react'
import '../css/WeatherMain.css'
import Axios from 'axios'
import bg_img from '../images/lukasz-lada-LtWFFVi1RXQ-unsplash.jpg'

const API_key = 'fc3f8e27448ded8472192135000e1389'

const WeatherMain = () => {
  const [city_name, setCity_name] = useState('')
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  const fetchData = async () => {
    try {
      const response = await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}`
      )
      setData(response.data)
      setError('')
    } catch (err) {
      setError('Enter correct city name')
      setData(null)
    }
  }

  // Function to convert temperature from Kelvin to Celsius
  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15
  }

  return (
    <>
      <img src={bg_img} alt="" className="bg_img" />
      <div className="content">
        <div className="header-main">
          <h2>Weather Application</h2>
        </div>
        <div className="input">
          <input
            type="text"
            placeholder="Enter Any City Name"
            value={city_name}
            onChange={(e) => setCity_name(e.target.value)}
            required
          />{' '}
          &nbsp;
          <button onClick={fetchData} className="btn btn-success btn-lg">
            FETCH
          </button>
        </div>{' '}
        <br />
        <div className="container">
          {error && <div className="error">{error}</div>}
          {data && (
            <div className="text-center fw-bold">
              <p>City Name: {data.name}</p>
              <p>Country Name: {data.sys.country}</p>
              <p>
                Temperature : {Math.round(kelvinToCelsius(data.main.temp))}°C
              </p>
              <p>
                Max Temperature :{' '}
                {Math.round(kelvinToCelsius(data.main.temp_max))}°C{' '}
                
              </p>
              <p>
                Humidity : {data.main.humidity}%{' '}
               
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default WeatherMain
