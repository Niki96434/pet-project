import Task from "./Task";
import { useGetTasks } from "../lib/hooks/useGetTasks";

export default function TaskList() {
    const { tasks, isLoading } = useGetTasks();

    if (isLoading) {
        return <div>Загрузка...</div>
    }

    if (!tasks) {
        return <div>Задачи не найдены</div>
    }

    return (
        <div className="task-list">
            {tasks.map((task) => {
                return <Task key={task.id} id={task.id} title={task.title} />
            })}
        </div>
    )
}
