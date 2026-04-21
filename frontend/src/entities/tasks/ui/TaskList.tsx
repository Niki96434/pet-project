import Task from "./Task";
import { useGetTasks } from "../lib/hooks/useGetTasks";
import './TaskList.css';

export default function TaskList() {
    const { tasks, isLoading } = useGetTasks();

    if (isLoading) {
        return <div>Загрузка...</div>
    }

    if (!tasks || tasks.length === 0) {
        return <div>Задачи не найдены</div>
    }

    return (
        <div className="list-container">
            <div className="header-task-list">
                <div className="header-img"></div>
                <p>Todos</p>
                <button className="plus-img" aria-label="Add task" />
            </div>
            <hr />
            <div className="task-list">
                {tasks.map((task) => {
                    return <Task key={task.id} {...task} />
                })}
            </div>
        </div>
    )
}
