import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    course: ""
  });

  const [editId, setEditId] = useState(null);

  // GET students
  const getStudents = async () => {
    const res = await axios.get("http://localhost:5000/students");
    setStudents(res.data);
  };

  useEffect(() => {
    getStudents();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(`http://localhost:5000/students/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/students", form);
    }

    setForm({ name: "", email: "", age: "", course: "" });
    getStudents();
  };

  // Delete
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/students/${id}`);
    getStudents();
  };

  // Edit
  const handleEdit = (student) => {
    setForm(student);
    setEditId(student._id);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">🎓 Student Management System</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col">
            <input className="form-control" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
          </div>
          <div className="col">
            <input className="form-control" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          </div>
          <div className="col">
            <input className="form-control" name="age" placeholder="Age" value={form.age} onChange={handleChange} />
          </div>
          <div className="col">
            <input className="form-control" name="course" placeholder="Course" value={form.course} onChange={handleChange} />
          </div>
          <div className="col">
            <button className="btn btn-primary w-100">
              {editId ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </form>

      {/* TABLE */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.age}</td>
              <td>{s.course}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(s)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(s._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;