import { useState, useOptimistic } from "react";
import TaskList from "../../entities/tasks/ui/TaskList";
import TaskModalForm from './../../entities/tasks/ui/TaskModalForm';
import { useGetTasks } from "./../../entities/tasks/lib/hooks/useGetTasks";
import type { FormDataType } from "../../entities/tasks/model/types";

export default function HomePage() {
    const [isOpen, setOpenModal] = useState<boolean>(false);
    const { tasks, setTasks, isLoading } = useGetTasks();
    const [optimisticTodos, setOptimisticTodo] = useOptimistic<FormDataType[], FormDataType>(tasks ?? [], (state, newTask: FormDataType) => {
        return [newTask, ...state]
    });

    if (isLoading) {
        return <div>Загрузка...</div>
    }

    return (
        <div id='home-page-container' onClick={() => setOpenModal(false)}>
            <TaskList optimisticTodos={optimisticTodos} handleModal={() => setOpenModal(true)} />
            {isOpen && <TaskModalForm setTasks={setTasks} setOptimisticTodo={setOptimisticTodo} handleModal={() => setOpenModal(false)} />}
        </div>
    )
}