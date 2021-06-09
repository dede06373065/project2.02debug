import React, { Component } from 'react'
import './list.css'
import PubSub from 'pubsub-js'
import axios from 'axios'

export default class List extends Component {
    state = {
        city: 'adelaide',
        forecast: []//星期，温度，气候，气候图标
    }
    weatherIcon = (props) => {
        switch (props) {
            case "Clear":
                return "🌞";
            case "Clouds":
                return "☁️";
            case "Drizzle":
                return "☔️";
            case "Rain":
                return "☔️";
            case "Snow":
                return "❄️";
            case "Fog":
                return "🌁";
            case "Thunderstorm":
                return "⛈️";
            default:
                return "...";
        }
    }
    componentDidMount() {
        const { forecast } = this.state
        const myDate = new Date()
        PubSub.subscribe('cityName', (_, city) => {
            this.setState({ city })
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=2ece6441e298124f969938e7eb0d0302`).then(
                response => {
                    const forecastWeather = response.data.list
                    for (let i = 0; i < 4; i++) {
                        var milliseconds = myDate.getTime() + 1000 * 60 * 60 * 24 * (i + 1);
                        var newMyDate = new Date(milliseconds);
                        forecast[i] = {
                            degree: forecastWeather[(i + 1) * 8].main.temp,
                            weather: forecastWeather[(i + 1) * 8].weather[0].main,
                            week: newMyDate.toLocaleDateString([], { weekday: 'long' })
                        }
                    }
                    this.setState({ forecast })
                },
                error => {
                    console.log(error)
                }
            )
        })  
    }
    componentWillUnmount() {
        PubSub.unsubscribe('cityName')
    }
    render() {
        const { forecast } = this.state
        return (
            <div className="content__ground">
                <ul className="row">
                    {forecast.map((item, index) => {
                        return (
                            <li key={index} className="card">
                                <h3>{item.week}</h3>
                                <h3>{this.weatherIcon(item.weather)}</h3>
                                <h3>{item.degree} ℃</h3>
                                <p>{item.weather}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
