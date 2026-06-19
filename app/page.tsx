import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    filter?: string;
  }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth");

  const params = await searchParams;
  const search = params.search || "";
  const filter = params.filter || "all";

  const tasks = await prisma.task.findMany({
    where: {
      userId: user.sub,
      ...(search && {
        title: {
          contains: search,
          mode: "insensitive",
        },
      }),
      ...(filter === "completed" && {
        completed: true,
      }),
      ...(filter === "pending" && {
        completed: false,
      }),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingCount = tasks.length - completedCount;

  return (
    <main className="max-w-2xl mx-auto p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">TaskFlow Pro</h1>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-500">Hi, {user.name}</span>
          <form action="/api/auth?action=logout" method="POST">
            <button type="submit" className="text-red-500 underline">
              Logout
            </button>
          </form>
        </div>
      </div>

      <form>
        <input
          name="search"
          defaultValue={search}
          placeholder="Search tasks..."
          className="border p-2 w-full mb-4 rounded"
        />
      </form>

      <div className="flex gap-4 mb-4">
        <a href="/">All</a>
        <a href="/?filter=pending">Pending</a>
        <a href="/?filter=completed">Completed</a>
      </div>

      <div className="flex gap-6 mb-6">
        <p>Total: {tasks.length}</p>
        <p>Completed: {completedCount}</p>
        <p>Pending: {pendingCount}</p>
      </div>

      <AddTaskForm />
      <TaskList tasks={tasks} />
    </main>
  );
}