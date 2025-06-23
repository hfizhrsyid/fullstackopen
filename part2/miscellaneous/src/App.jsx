import { useState, useEffect } from "react"
import Note from "./components/Note"
import noteService from "./services/notes"
import Notification from "./components/Notification"

const App = () => {
  const [notes, setNotes] = useState([])  //array untuk semua note
  const [newNote, setNewNote] = useState('')  //input buat nambah note baru
  const [showAll, setShowAll] = useState(true)  //button buat ngeliat semuanya
  const [errorMessage, setErrorMessage] = useState(null)

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const effect = () => {
    console.log('effect')
    noteService
      .getAll()
      .then(initialData => {
        setNotes(initialData)
        console.log('promise fulfilled')
      })
  }
  
  useEffect(effect, [])

  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }

    noteService
      .create(noteObject)
      .then(response => {
        setNotes(notes.concat(response.data))
        console.log(response)
        setNewNote('')
      })
  }

  const toggleImportanceOf = (id) => {
    console.log('importance of ' + id + ' needs to be toggled')
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(response => {
        setNotes(notes.map(note => note.id === id ? response.data : note))
      })
      .catch(() => {
        setErrorMessage(`Note ${note ? note.content : ''} was already removed from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id != id))
      })
    console.log('importance of ' + id + ' has been toggled')
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div className="newBody">
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => (
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save!</button>
      </form>
    </div>
  )
}

export default App