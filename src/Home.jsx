// src/Home.jsx
import React, { useState, useEffect } from 'react';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const [todos, setTodos] = useState([
    { id: 1, text: 'Complete project report', deadline: '2025-07-02T23:00', status: 'incomplete' },
    { id: 2, text: 'Team meeting', deadline: '2025-07-03T10:00', status: 'completed' },
    { id: 3, text: 'Buy groceries', deadline: '2025-07-02T20:00', status: 'incomplete' }
  ]);

  const [filter, setFilter] = useState('incomplete');
  const [newTask, setNewTask] = useState('');
  const [deadline, setDeadline] = useState('');
  const [editId, setEditId] = useState(null);

  // Auto-expire past deadlines
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTodos((prev) =>
        prev.map((todo) =>
          todo.status === 'incomplete' && new Date(todo.deadline) < now
            ? { ...todo, status: 'expired' }
            : todo
        )
      );
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const addOrUpdateTodo = () => {
    if (!newTask.trim() || !deadline) return;

    const now = new Date();
    const isExpired = new Date(deadline) < now;

    const todoData = {
      id: editId || Date.now(),
      text: newTask,
      deadline,
      status: isExpired ? 'expired' : 'incomplete'
    };

    if (editId) {
      setTodos((prev) => prev.map((t) => (t.id === editId ? todoData : t)));
      setEditId(null);
    } else {
      setTodos((prev) => [...prev, todoData]);
    }

    setNewTask('');
    setDeadline('');
  };

  const changeStatus = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status: todo.status === 'incomplete' ? 'completed' : 'incomplete'
            }
          : todo
      )
    );
  };

  const editTodo = (todo) => {
    if (todo.status === 'expired') return;
    setNewTask(todo.text);
    setDeadline(todo.deadline);
    setEditId(todo.id);
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const isExpiringSoon = (todo) => {
    const now = new Date();
    const timeLeft = new Date(todo.deadline) - now;
    return todo.status === 'incomplete' && timeLeft > 0 && timeLeft < 3600000;
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'incomplete':
        return todo.status === 'incomplete' && !isExpiringSoon(todo);
      case 'completed':
        return todo.status === 'completed';
      case 'expiringSoon':
        return isExpiringSoon(todo);
      case 'expired':
        return todo.status === 'expired';
      default:
        return true;
    }
  });

  const getBadgeColor = (status) => {
    switch (status) {
      case 'incomplete': return 'secondary';
      case 'completed': return 'success';
      case 'expired': return 'danger';
      default: return 'warning';
    }
  };

  return (
    <div className="fullscreen-container bg-light">
      {/* Profile Button */}
      <div className="d-flex justify-content-end p-3">
        <button
          className="btn btn-outline-dark"
          onClick={() => navigate('/profile')}
        >
          👤 Profile
        </button>
      </div>

      <div className="container-fluid page-content px-4">
        <h2 className="text-center mt-2 text-primary">📋 Your Tasks</h2>

        {/* Add/Update Task */}
        <div className="card mt-4 p-4 shadow custom-form">
          <div className="row g-2">
            <div className="col-md-5">
              <input
                className="form-control"
                type="text"
                placeholder="Enter task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                className="form-control"
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <button className="btn btn-primary w-100" onClick={addOrUpdateTodo}>
                {editId ? 'Update' : 'Add Task'}
              </button>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="btn-group mt-4 w-100 flex-wrap justify-content-center">
          {['incomplete', 'completed', 'expiringSoon', 'expired'].map((key) => (
            <button
              key={key}
              className={`btn btn-outline-${getBadgeColor(key)} ${filter === key ? 'active' : ''}`}
              onClick={() => setFilter(key)}
            >
              {key === 'expiringSoon' ? 'Expiring Soon' : key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>

        {/* Task Cards */}
        <div className="row mt-4">
          {filteredTodos.length === 0 ? (
            <p className="text-muted text-center">No tasks found.</p>
          ) : (
            filteredTodos.map((todo) => (
              <div className="col-md-6 col-lg-4 mb-4" key={todo.id}>
                <div className="card task-card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title d-flex justify-content-between align-items-center">
                      {todo.text}
                      <span className={`badge bg-${getBadgeColor(todo.status)} ms-2`}>
                        {todo.status === 'expired' ? 'Expired' : todo.status}
                      </span>
                    </h5>
                    <p className="card-text small text-muted">
                      Deadline: {new Date(todo.deadline).toLocaleString()}
                    </p>
                    <div className="d-flex justify-content-end gap-2">
                      {todo.status !== 'expired' && (
                        <>
                          <button className="btn btn-sm btn-outline-success" onClick={() => changeStatus(todo.id)}>✓</button>
                          <button className="btn btn-sm btn-outline-warning" onClick={() => editTodo(todo)}>✏️</button>
                        </>
                      )}
                      <button className="btn btn-sm btn-outline-danger" onClick={() => deleteTodo(todo.id)}>🗑️</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
