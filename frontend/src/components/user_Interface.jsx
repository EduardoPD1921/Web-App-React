import React, {Component} from 'react'
import axios from 'axios'

import Nav from './templates/Nav'
import Main from './templates/Main'
import NoteInfo from './note_Info'

const initialState = {
    notes: [],
    noteOnChanging: '',
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

    renderNoteContent(event) {
        try {
            event.preventDefault()
            
            const noteFiltered = this.state.notes.filter(e => e.id.toString() === event.target.id.toString())
            const noteIndex = this.state.notes.indexOf(noteFiltered[0])
            const note = this.state.notes[noteIndex]
            
            document.getElementById('textarea').value = noteFiltered[0].content
            this.setState({noteOnChanging: note})
        } catch(e) {
            console.warn(e)
        }
    }

    renderNotes() {
        return (
            this.state.notes.map(note => {
                return (
                    <a href="/" className="navItem" id={note.id} key={note.id} onClick={e => this.renderNoteContent(e)}>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">    
                            <path fillRule="evenodd" d="M6 12.796L11.481 8 6 3.204v9.592zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>    
                        </svg>    
                        {note.title}
                        <button className="delete-Button" idnote={note.id} onClick={e => this.deleteNote(e)}>
                            <svg width="1em" height="1em" idnote={note.id} viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path idnote={note.id} fillRule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                            </svg>
                        </button>   
                    </a>    
                )
            })
        )
    }

    renderNoteInfo() {
        if (this.state.noteOnChanging) {
            return (
                `Note created in ${this.state.noteOnChanging.date.day} at ${this.state.noteOnChanging.date.time}`
            )
        }
    }

    deleteNote(event) {
        const noteid = event.target.attributes.idnote.value
        const noteFiltered = this.state.notes.filter(e => noteid.toString() === e.id.toString())
        axios.delete(`${baseUrl}/${noteid}`)

        document.getElementById('textarea').value = ''
        this.setState({noteOnChanging: ''})
        this.updateLocalNoteList(noteFiltered, true)
    }

    saveNote(event) {
        const note = document.getElementById('textarea').value
        const noteOnChanging = this.state.noteOnChanging
        noteOnChanging.content = note

        axios.put(`${baseUrl}/${noteOnChanging.id}`, noteOnChanging)
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

                axios.post(`${baseUrl}`, note).then(resp => this.updateLocalNoteList(resp.data, false))
            }
        }
    }

    updateLocalNoteList(newNote, isRemoving) {

        if (isRemoving === false) {
            const currentNotes = this.state.notes

            currentNotes.push(newNote)
            this.setState({notes: currentNotes})
            this.setState({creatingANewNote: false})
        } else if (isRemoving === true) {
            const currentNotes = this.state.notes

            currentNotes.splice(currentNotes.indexOf(newNote[0]), 1)
            this.setState({notes: currentNotes})
        }
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
                    <NoteInfo>
                        <div className="note-Info">
                            {this.renderNoteInfo()}
                        </div>
                        
                        <button type="button" className="save-Button" onClick={() => this.saveNote()}>Save</button>
                    </NoteInfo>
                    <textarea id="textarea" rows="35" cols="60">
                    </textarea>
                </Main>
            </React.Fragment>
        )
    }
}