import React from 'react'
import { useState } from 'react'

export const ClimaApp = () => {

    const kelvin = 273.15
    const [Ciudad, setCiudad] = useState('')
    const [Data, setData] = useState(null)
    const handleChange = (e) => {
        setCiudad(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (Ciudad.length > 0) {
            fetchClima()
        }
    }
    const fetchClima = async () => {
        try {
            const key = 'c248f4eaedb008b317c1f20c36cf551e'
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${Ciudad}&appid=${key}`
            const resp = await fetch(url)
            const data = await resp.json()
            setData(data)
        } catch (error) {
            console.log('Error en la petición: ', error)
        }

    }
    return (
        <>
            <div className='container'>
                <h1>Aplicación de Clima</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="ciudad"
                        placeholder='Nombre de la ciudad'
                        id='ciudad'
                        value={Ciudad}
                        onChange={handleChange}
                    />
                    <button type='submit'>Buscar</button>
                </form>
                {
                    Data && (
                        <div>
                            <h2>{Data.name}</h2>
                            <p>Temperatura: {parseInt(Data?.main?.temp - kelvin)} °C</p>
                            <p>Condición Meteorológica: {Data.weather[0].description}</p>
                            <img src={`http://openweathermap.org/img/w/${Data.weather[0].icon}.png`} alt="icono" />
                        </div>   

                    )
                }
            </div>
        </>
    )
}
