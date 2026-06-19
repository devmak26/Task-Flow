import TaskCard from "./TaskCard";

type Task = {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  priority: string;
  dueDate?: Date | null;
};

export default function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}