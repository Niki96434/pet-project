import Task from "./Task";
import './TaskList.css';
import HeaderTaskList from "./HeaderTaskList";
import headerIcon from './../../../assets/Category.svg';
import type { TaskType } from "../model/types";


interface TaskListProps {
    handleEditModal: () => void;
    handleModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
    tasks: TaskType[];
}

export function TaskList({ handleEditModal, handleModal, tasks }: TaskListProps) {

    return (
        <div className="list-container" onClick={(e) => e.stopPropagation()}>
            <HeaderTaskList handleModal={handleModal} headerIcon={headerIcon} children={'Todos'} />
            <hr />
            <div className="task-list">
                {tasks.map((task: TaskType) => {
                    return <Task key={task.id} {...task} handleEditModal={handleEditModal} />
                })}
            </div>
        </div>
    )
}
