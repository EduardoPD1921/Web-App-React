import React, {Component} from 'react'
import './Button.css'
import axios from 'axios'

import Nav from './templates/Nav'
import Main from './templates/Main'

const initialState = {
    notes: [],
    currentContent: '',
    defaultNoteName: 'New note',
    newNote: {id: '', content: '', date: {day: '', time: ''}, title: ''},
    creatingANewNote: false
}

const baseUrl = 'http://localhost:3001/notes'

export default class Button extends Component {
    state = {...initialState}

    componentDidMount() {
        axios(`${baseUrl}`).then(resp => {
            this.setState({notes: resp.data})
        })
    }

    renderButton() {
        return (
            <button className="btn btn-light" onClick={e => this.setCreateANewNote()}>
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

    setCreateANewNote() {
        this.setState({creatingANewNote: true})
    }

    renderInputNoteName() {
        if (this.state.creatingANewNote === true) {
            return (
                <span>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">    
                        <path fillRule="evenodd" d="M6 12.796L11.481 8 6 3.204v9.592zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>    
                    </svg>
                    <input onKeyPress={e => this.createNewNote(e)} placeholder="New note"></input>
                </span>
            )
        }
    }

    createNewNote(event) {
        if (event.key === 'Enter') {
            if (event.target.value !== '') {
                const note = this.state.newNote
                note.title = event.target.value

                const day = new Date().toLocaleDateString()
                const time = new Date().toLocaleTimeString()
                note.date.day = day
                note.date.time = time

                axios.post(`${baseUrl}`, note).then(resp => this.updateLocalNoteList(resp.data))
            }
        }
    }

    updateLocalNoteList(newNote) {
        const currentNotes = this.state.notes

        currentNotes.push(newNote)
        this.setState({notes: currentNotes})
        this.setState({creatingANewNote: false})
    }

    render() {
        return (
            <React.Fragment>
                <Nav>
                    {this.renderNotes()}
                    {this.renderInputNoteName()}
                    {this.renderButton()}
                </Nav>
                <Main>
                    <textarea rows="35" cols="60" defaultValue={this.state.currentContent}>
                    </textarea>
                </Main>
            </React.Fragment>
        )
    }
}