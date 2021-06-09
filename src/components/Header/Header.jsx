import React, { Component } from 'react'
import './header.css'
import PubSub from 'pubsub-js'

export default class Header extends Component {

    search=()=>{
        const {inputCity}=this
        const cityName=inputCity.value.trim()
        PubSub.publish('cityName',cityName)
    }

    render() {
        const time = new Date();
        const timeDate = time.toLocaleDateString([], { weekday: 'long' });
        return (
            <div className="nav">
                <ul className="nav__bar">
                    <li className="nav__bar__logo">
                        Weather APP
                    </li>
                    <li className="nav__bar__date">{timeDate}</li>
                    <li className="nav__bar__more">
                        <div className="input-group">
                            <input ref={c=>this.inputCity=c} type="text" className="form-control" placeholder="Search for..." />
                            <span className="input-group-btn">
                                <button onClick={this.search} className="btn btn-default" type="button">Search!</button>
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}
