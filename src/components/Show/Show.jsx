import React, { Component } from 'react'
import List from '../List/List'
import './show.css'
import axios from 'axios'
import PubSub from 'pubsub-js'

export default class Show extends Component {
    state = {
        city: 'Welcome !',
        temp: '🌡️',
        weather:'🏖',
        humidity: '💧',
        windSpeed: '🪁'

    }
    componentDidMount() {
        PubSub.subscribe('cityName', (_, cityName) => {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=2ece6441e298124f969938e7eb0d0302`).then(
                response => {
                    const data=response.data
                    this.setState({
                        city: data.name,
                        temp: data.main.temp,
                        weather:data.weather[0].main,
                        humidity: data.main.humidity,
                        windSpeed:data.wind.speed

                    })
                },
                error => {
                    alert('Please input the correct cityName.')
                }
            )
            
        })
       
    }
    componentWillUnmount() {
        PubSub.unsubscribe('cityName')
    }
    render() {
        const { city , temp ,weather,humidity,windSpeed} = this.state
        return (
            <div className="content">
                <div className="content__top">
                    <div className="content__top__details">
                        <div className="degree">{temp}℃</div>
                        <h2>{weather}</h2>
                        <ul className="otherdetails">
                            <li>
                                <h4>Humidity:</h4>
                                <h4>{humidity}%</h4>
                        </li>
                            <li className="border">
                                <h4>Wind:</h4>
                                    <h4>{windSpeed}km/h</h4>
                        </li>
                        </ul>
                    </div>
                    <div className="content__top__location">{city}</div>
                </div>
                <List />
            </div>
        )
    }
}
