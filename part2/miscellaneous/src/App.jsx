import { useState, useEffect } from "react"
import Note from "./components/Note"
import axios from "axios"

// const App = ({ notes }) => {
//   const newNotes = notes.filter(note => note.important === true)
//   const [notesByHooks, setNotes] = useState(notes)
//   const [newNote, setNewNote] = useState('a new note...')
//   const [showAll, setShowAll] = useState(true)

//   const notesToShow = showAll ? notesByHooks : notesByHooks.filter(note => note.important === true)
  
//   const addNote = (event) => {
//     event.preventDefault()
    
//     const noteObject = {
//       content: newNote,
//       important: Math.random() < 0.5,
//       id: String(notesByHooks.length + 1),
//     }

//     setNotes(notesByHooks.concat(noteObject))
//     setNewNote('')
//     console.log('button clicked', event.target)
//   }

//   const handleNoteChange = (event) => {
//     console.log(event.target.value)
//     setNewNote(event.target.value)
//   }

//   return (
//     <div>
//       <h1>Notes</h1>
//       <ul>
//         {notesByHooks.map(note => <Note key={note.id} note={note} />)}
//       </ul>
//       <h1>Important Notes</h1>
//       <ol>
//         {newNotes.map(note => 
//           <Note key={note.id} note={note} />
//         )}
//       </ol>
//       <h1>This is Supposed to Be the Right One Tho...</h1>
//       <ul>
//         {notesToShow.map(note => <Note key={note.id} note={note} />)}
//       </ul>
//       <h2>Part 2 of this course has been teaching me the higher order function like filter and map. And don't forget about refactoring!</h2>
      
//       <h1>Notes</h1>
//       <div>
//         <button onClick={() => setShowAll(!showAll)}>
//           show {showAll ? 'important' : 'all'}
//         </button>
//       </div>
      
//       <form onSubmit={addNote}>
//         <input value={newNote} onChange={handleNoteChange} />
//         <button type="submit">Save!</button>
//       </form>
//     </div>
//   )
// }

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const effect = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }
  useEffect(effect, [])

  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }

    axios
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
        setNotes(notes.concat(response.data))
        console.log(response)
        setNewNote('')
      })
  }
  
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => <Note key={note.id} note={note} />)}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save!</button>
      </form>
    </div>
  )
}

export default App