"use client";

import {
  deleteTask,
  toggleTask,
  updateTask,
} from "@/app/actions";
import { useState } from "react";

type Task = {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  priority: string;
  dueDate?: Date | null;
};

export default function TaskCard({ task }: { task: Task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(
    task.description || ""
  );

  return (
    <div className="border p-4 rounded shadow">
      {isEditing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full rounded"
          />

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="border p-2 w-full mt-2 rounded"
          />

          <button
            onClick={() => {
              updateTask(task.id, title, description);
              setIsEditing(false);
            }}
            className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <h2
            className={`text-xl font-bold ${
              task.completed ? "line-through" : ""
            }`}
          >
            {task.title}
          </h2>

          <p>{task.description}</p>
        </>
      )}

      <p
        className={
          task.priority === "High"
            ? "text-red-500"
            : task.priority === "Medium"
            ? "text-yellow-500"
            : "text-green-500"
        }
      >
        Priority: {task.priority}
      </p>

      <p>
        Due:{" "}
        {task.dueDate
          ? new Date(task.dueDate)
              .toISOString()
              .slice(0, 10)
          : "No due date"}
      </p>

      <div className="flex gap-4 mt-4">
        <button
          onClick={() =>
            toggleTask(task.id, task.completed)
          }
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button
          onClick={() => setIsEditing(true)}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>

        <button
          onClick={() => deleteTask(task.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}