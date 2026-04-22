import Task from "./Task";
import { useGetTasks } from "../lib/hooks/useGetTasks";
import './TaskList.css';
import HeaderTaskList from "./HeaderTaskList";
import headerIcon from './../../../assets/Category.svg';

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
            <HeaderTaskList headerIcon={headerIcon} children={'Todos'} />
            <hr />
            <div className="task-list">
                {tasks.map((task) => {
                    return <Task key={task.id} {...task} />
                })}
            </div>
        </div>
    )
}
