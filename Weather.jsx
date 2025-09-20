import React, { useEffect } from 'react'
import './weather.css'
import { useState } from 'react'
import axios from 'axios'

const APIKey="uLkzTVMM9E54ySvBpX7tgwWa6UDPjmW4"

function Weather() {
    const[city,setCity]=useState("")
    const[weatherdata,setWeatherdata]=useState(null)
    const[error,setError]=useState(null)

    useEffect(()=>{
        fetchWeatherByGeolocation();
    },[])

    const fetchWeatherByGeolocation = async () => {
        try {
      // Get user's current position using Geolocation API
  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
       const response = await axios.get(
  `https://api.tomorrow.io/v4/weather/realtime?location=${latitude},${longitude}&apikey=${APIKey}`
            );
            console.log(response.data)
            setWeatherdata(response.data);
            setError(null);
          });
        } catch (error) {
          setError('Failed to fetch weather data');
          setWeatherdata(null);
        }
      };

    const handleSubmit=async ()=>{
     try{
        let response=await axios.get(
            `https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=${APIKey}`
        )
        setWeatherdata(response.data)
        setError(null)
     }
     catch(error){
setError('Failed to fetch weather Data')
setWeatherdata(null)
     }
    }
    console.log(weatherdata)
    console.log(error)
    
  return (
   <>
   <div className='container'>
 <h1 className='title'>Search Weather Condition</h1>
 <div className='inputContainer'>
 <input type='text' placeholder='Enter City Name'
 className='input' onChange={(e)=>setCity(e.target.value)}/>
 <button className='button' onClick={handleSubmit}>Search</button>
  </div>

   {error&&<p className='error'>error data</p>}
   {weatherdata&&(
    <div className='weatherContainer'>
        <h2 className='subtitle'>{weatherdata.location.name}</h2>
        <p className='temperature'>Temperature:{weatherdata.data.values.temperature}<sup>o</sup>C</p>
        <p className='humidity'>Humidity:{weatherdata.data.values.humidity}%</p>
        <p className='windspeed'>Wind Speed:{weatherdata.data.values.windSpeed}mph</p>
        </div>
   )}
   </div>
   </>
  )
}

export default Weather



//-->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> App.jsx <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<--//

// import React from 'react'

// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'
// import Weather from './WeatherApp/Weather'

// function App() {
//   return (
//     <div>
// <Heading />
// <Weather/>
//     </div>
//   )
// }

// export default App