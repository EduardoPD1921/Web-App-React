import React, {Component} from 'react'
import './Button.css'
import axios from 'axios'

import Nav from './templates/Nav'

const initialState = {
    notes: []
}

const baseUrl = 'http://localhost:3001'

export default class Button extends Component {
    state = {...initialState}

    componentDidMount() {
        axios(`${baseUrl}/notes`).then(resp => {
            this.setState({notes: resp.data})
        })
    }

    renderButton() {
        return (
            <button className="btn btn-light" onClick={e => this.renderNotes()}>
                + New Note
            </button>
        )
    }

    renderNotes() {
        return (
            this.state.notes.map(note => {
                return (
                    <a href="/" key={note.id}>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M6 12.796L11.481 8 6 3.204v9.592zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                        </svg>
                        {note.title}
                    </a>
                )
            })
        )
    }

    render() {
        return (
            <Nav>
                {this.renderNotes()}
                {this.renderButton()}
            </Nav>
        )
    }
}