import {useState, useEffect} from 'react'
import api from '../api'
import Note from "../components/Note";
import '../styles/Home.css'

/**
 * Component responsible for rendering and managing the notes application.
 * Provides functionality to perform CRUD operations on notes, including
 * retrieving, creating, and deleting notes. The component maintains a list
 * of notes and their respective states, while allowing users to create
 * custom notes with a title and content.
 *
 * @return {JSX.Element} The rendered Home component containing the list of notes,
 *                       the note creation form, and corresponding actions.
 */
function Home() {
    const [notes, setNotes] = useState([])
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')

    useEffect(() => {
        getNotes();
    }, [])

    const getNotes = () => {
        api
            .get('/api/notes/')
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data)
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert('Note deleted successfully')
                else alert('Failed to delete note')
                getNotes();
            })
            .catch((err) => alert(err))
    }

    const createNote = (e) => {
        e.preventDefault();
        api
            .post('/api/notes/', {title, content})
            .then((res) => {
                if (res.status === 201) alert('Note created successfully')
                else alert('Failed to create note')
                getNotes();
            })
            .catch((err) => alert(err))
    };

    return (
        <div>
            <div>
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
            </div>
            <h2>Create a note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br/>
                <input
                    type="text"
                    id="title"
                    name='title'
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br/>
                <textarea
                    id="content"
                    name='content'
                    required
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                ></textarea>
                <br/>
                <button type="submit" value="Submit">Submit</button>
            </form>
        </div>
    );
}

export default Home