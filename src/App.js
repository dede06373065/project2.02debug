import React, { Component } from 'react'
import './app.css'
import Header from './components/Header/Header'
import Show from './components/Show/Show'


export default class App extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Show />
             </div>
            
        )
    }
}
