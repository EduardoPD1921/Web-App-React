import React, {Component} from 'react'
import './Nav.css'

const initialState = {
    notes: {title: ''}
}

export default class Nav extends Component {

    state = {...initialState}

    renderNotes() {
        return this.state.notes.map(note => {
            return (
                <a href="/" className="note">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M6 12.796L11.481 8 6 3.204v9.592zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                    </svg>
                    {note.title}
                </a>
            )
        })
    }

    createNote() {
        this.setState({title: 'Foda'})
    }

    render() {
        return (
            <aside className="navContent">
                {this.renderNotes}
                
                <button className="btn btn-light">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>
                    <path fill-rule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>
                </svg>New note
                </button>
            </aside>
        )
    }
}