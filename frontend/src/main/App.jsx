import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import {BrowserRouter} from 'react-router-dom'

import Header from '../components/templates/Header'
import Button from '../components/Button'

export default props =>
    <BrowserRouter>
        <div className="app">
            <Header/>
            <Button/>
        </div>
    </BrowserRouter>
    
