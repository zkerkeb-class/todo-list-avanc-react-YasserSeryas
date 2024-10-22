import React from "react";
import { useTasks } from "../TasksContext"; // Importer useTasks pour accéder aux tâches

function CompletedTasks() {
  const { tasks } = useTasks();

  // Filtrer les tâches terminées
  const completedTasks = tasks.filter((task) => task.isCompleted);

  return (
    <div className="completed-tasks">
      <h2>Tâches Terminées</h2>
      {completedTasks.length === 0 ? (
        <p>Aucune tâche terminée.</p>
      ) : (
        <ul>
          {completedTasks.map((task, index) => (
            <li key={index}>{task.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CompletedTasks;
