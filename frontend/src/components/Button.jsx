import React, {Component} from 'react'
import './Button.css'
import axios from 'axios'

import Nav from './templates/Nav'
import Main from './templates/Main'

const initialState = {
    notes: [],
    currentContent: '',
    defaultNoteName: 'New note'
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

    renderNoteContent(e) {
        e.preventDefault()
        const noteContent = this.state.notes[e.target.id].content;
        this.setState({currentContent: noteContent})
    }

    renderNotes() {
        return (
            this.state.notes.map(note => {
                return (
                    <a href="/" className="navItem" key={note.id} {...note} onClick={e => this.renderNoteContent(e)}>
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
            <React.Fragment>
                <Nav>
                    {this.renderNotes()}
                    {this.renderButton()}
                </Nav>
                <Main>
                    <textarea rows="35" cols="60" defaultValue={this.state.currentContent} onChange={e => console.log('teste')}>
                    </textarea>
                    {console.log(this.state.currentContent)}
                </Main>
            </React.Fragment>
        )
    }
}