import { useState, useCallback } from "react";

function useTasks() {
  const [tasks, setTasks] = useState([]);

  // Ajouter une tâche (mémorisé avec useCallback)
  const addTask = useCallback((task) => {
    if (task) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { text: task, isCompleted: false },
      ]);
    }
  }, []);

  // Supprimer une tâche (mémorisé avec useCallback)
  const removeTask = useCallback((index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  }, []);

  // Marquer une tâche comme terminée ou non terminée (mémorisé avec useCallback)
  const toggleComplete = useCallback((index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  }, []);

  return {
    tasks,
    addTask,
    removeTask,
    toggleComplete,
    setTasks, // setTasks reste sans useCallback, car c'est un setter natif de useState
  };
}

export default useTasks;
