import Task from "./Task";
import './TaskList.css';
import HeaderTaskList from "./HeaderTaskList";
import headerIcon from './../../../assets/Category.svg';
import type { TaskType } from "../model/types";


interface TaskListProps {
    handleModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
    tasks: TaskType[];
}

export default function TaskList({ handleModal, tasks }: TaskListProps) {

    return (
        <div className="list-container" onClick={(e) => e.stopPropagation()}>
            <HeaderTaskList handleModal={handleModal} headerIcon={headerIcon} children={'Todos'} />
            <hr />
            <div className="task-list">
                {tasks.map((task: TaskType) => {
                    return <Task key={task.id} {...task} />
                })}
            </div>
        </div>
    )
}
