import React, { useState, useMemo } from "react";
import { TasksProvider, useTasks } from "./TasksContext"; // Importer TasksProvider et useTasks
import "./App.css";
import CompletedTasks from "./components/CompletedTasks"; // Importer le composant qui affiche les tâches terminées

function AppContent() {
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");
  const { tasks, addTask, removeTask, toggleComplete } = useTasks(); // Utiliser useTasks pour accéder aux fonctions et tâches

  const handleAddTask = () => {
    addTask(task);
    setTask(""); // Réinitialiser l'entrée après ajout
  };

  const filteredTasks = useMemo(() => {
    if (filter === "completed") {
      return tasks.filter((task) => task.isCompleted);
    } else if (filter === "incomplete") {
      return tasks.filter((task) => !task.isCompleted);
    } else {
      return tasks; // Toutes les tâches
    }
  }, [tasks, filter]);

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <div className="input-area">
        <input
          type="text"
          placeholder="Ajouter une tâche..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Ajouter</button>
      </div>
      <div className="filters">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active" : ""}
        >
          Toutes
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={filter === "completed" ? "active" : ""}
        >
          Terminées
        </button>
        <button
          onClick={() => setFilter("incomplete")}
          className={filter === "incomplete" ? "active" : ""}
        >
          Non terminées
        </button>
      </div>
      <div className="task-list">
        {filteredTasks.map((t, index) => (
          <div
            key={index}
            className={`task ${t.isCompleted ? "completed" : ""}`}
          >
            <span onClick={() => toggleComplete(index)}>{t.text}</span>
            <button onClick={() => removeTask(index)}>Supprimer</button>
          </div>
        ))}
      </div>
      <CompletedTasks />{" "}
      {/* Afficher les tâches terminées dans un composant séparé */}
    </div>
  );
}

function App() {
  return (
    <TasksProvider>
      <AppContent />
    </TasksProvider>
  );
}

export default App;
