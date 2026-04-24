import { useState } from "react";
import TaskList from "../../entities/tasks/ui/TaskList";
import TaskModalForm from './../../entities/tasks/ui/TaskModalForm';
import { useGetTasks } from "./../../entities/tasks/lib/hooks/useGetTasks";

export default function HomePage() {
    const [isOpen, setOpenModal] = useState<boolean>(false);
    const { tasks, isLoading } = useGetTasks();

    if (isLoading) {
        return <div>Загрузка...</div>
    }

    if (!tasks || tasks.length === 0) {
        return <div>Задачи не найдены</div>
    }

    return (
        <div id='home-page-container' onClick={() => setOpenModal(false)}>
            {isOpen && <TaskModalForm handleModal={() => setOpenModal(false)} />}
            <TaskList tasks={tasks} handleModal={() => setOpenModal(true)} />
        </div>
    )
}