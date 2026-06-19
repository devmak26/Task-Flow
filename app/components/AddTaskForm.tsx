"use client";

import { createTask } from "@/app/actions";
import { useState } from "react";

export default function AddTaskForm() {
  const [title, setTitle] = useState("");
  const [subtasks, setSubtasks] = useState("");

  async function generateSubtasks() {
    const res = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify({ task: title }),
    });

    const data = await res.json();
    setSubtasks(data.subtasks);
  }

  return (
    <form action={createTask} className="space-y-4 mb-6">
      <input
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="border p-3 w-full rounded text-white bg-zinc-900"
      />

      <textarea
        name="description"
        placeholder="Description"
        className="border p-3 w-full rounded text-white bg-zinc-900"
      />

      <select
        name="priority"
        className="border p-3 w-full rounded text-white bg-zinc-900"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <input
        type="date"
        name="dueDate"
        className="border p-3 w-full rounded text-white bg-zinc-900"
      />

      {/* Buttons with spacing */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={generateSubtasks}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Generate Subtasks with AI
        </button>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Task
        </button>
      </div>

      {subtasks && (
        <div className="border p-4 rounded bg-zinc-900 mt-4">
          <h2 className="font-bold mb-2">
            AI Suggested Subtasks
          </h2>
          <p className="whitespace-pre-line">
            {subtasks}
          </p>
        </div>
      )}
    </form>
  );
}