import Task from "./Task";
import './TaskList.css';
import HeaderTaskList from "./HeaderTaskList";
import headerIcon from './../../../assets/Category.svg';
import type { FormDataType } from "../model/types";

interface TaskListProps {
    handleModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
    optimisticTodos: FormDataType[];
}

export default function TaskList({ handleModal, optimisticTodos }: TaskListProps) {

    return (
        <div className="list-container" onClick={(e) => e.stopPropagation()}>
            <HeaderTaskList handleModal={handleModal} headerIcon={headerIcon} children={'Todos'} />
            <hr />
            <div className="task-list">
                {optimisticTodos.map((task: FormDataType, index: number) => {
                    return <Task key={index} {...task} />
                })}
            </div>
        </div>
    )
}
