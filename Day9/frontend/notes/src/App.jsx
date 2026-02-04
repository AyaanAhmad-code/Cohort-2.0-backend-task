import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editDesc, setEditDesc] = useState("");

  const API = "https://cohort-2-0-backend-task.onrender.com/api/notes";

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await axios.get(API);
    setNotes(res.data.notes);
  };

  const addNote = async (e) => {
    e.preventDefault();
    const { title, description } = e.target.elements;

    await axios.post(API, {
      title: title.value,
      description: description.value,
    });

    e.target.reset();
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchNotes();
  };

  const startEdit = (note) => {
    setEditId(note._id);
    setEditDesc(note.description);
  };

  const updateNote = async (e, id) => {
    e.preventDefault();
    await axios.patch(`${API}/${id}`, { description: editDesc });
    setEditId(null);
    fetchNotes();
  };

  return (
    <main>
      <nav>
        <h1>📝 Notes App</h1>
        <div className="nav-right">
          <span>Welcome 👋</span>
          <button className="new-btn">New Note</button>
        </div>
      </nav>

      <form className="add-form" onSubmit={addNote}>
        <input name="title" placeholder="Enter title" required />
        <input name="description" placeholder="Enter description" required />
        <button className="create-btn">Create note</button>
      </form>

      <section className="notes">
        {notes.map((note) => (
          <div className="note" key={note._id}>
            <h2>{note.title}</h2>

            {editId === note._id ? (
              <form
                className="edit-form"
                onSubmit={(e) => updateNote(e, note._id)}
              >
                <input
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                />
                <div className="actions">
                  <button className="edit-btn">Update</button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setEditId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <p>{note.description}</p>
                <div className="actions">
                  <button
                    className="delete-btn"
                    onClick={() => deleteNote(note._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => startEdit(note)}
                  >
                    Edit Description
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </section>

      <footer>
        © 2026 Notes App • MERN Stack 🚀
      </footer>
    </main>
  );
}
