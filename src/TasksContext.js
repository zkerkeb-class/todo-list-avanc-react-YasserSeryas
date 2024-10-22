import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react";

// Créer le contexte
const TasksContext = createContext();

// Provider pour le contexte
export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // Charger les tâches depuis le localStorage au montage du composant
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks && storedTasks.length > 0) {
      setTasks(storedTasks);
    }
  }, []);

  // Sauvegarder les tâches dans le localStorage à chaque fois que la liste change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Ajouter une tâche
  const addTask = useCallback((task) => {
    if (task) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { text: task, isCompleted: false },
      ]);
    }
  }, []);

  // Supprimer une tâche
  const removeTask = useCallback((index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  }, []);

  // Marquer une tâche comme terminée ou non terminée
  const toggleComplete = useCallback((index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  }, []);

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, removeTask, toggleComplete }}
    >
      {children}
    </TasksContext.Provider>
  );
}

// Hook pour accéder au contexte
export function useTasks() {
  return useContext(TasksContext);
}
