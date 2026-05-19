import Task from "./Task";
import './TaskBoard.css';
import HeaderTaskList from "./HeaderTaskList";
import headerIcon from './../../../assets/Category.svg';
import type { TaskType } from "../model/types";
import type { BoardType } from "../../../pages/tasks-page/ui/TasksPage";

interface TaskBoardProps {
    handleModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
    tasks: TaskType[];
    children: React.ReactNode;
    board: BoardType;
}

export function TaskBoard({ handleModal, tasks, children, board }: TaskBoardProps) {

    return (
        <div className="list-container" onClick={(e) => e.stopPropagation()}>
            <HeaderTaskList handleModal={handleModal} headerIcon={headerIcon} children={children} />
            <hr />
            <div className="task-list">
                {tasks.map((task: TaskType) => {
                    return <Task key={task.id} task={task} board={board} />
                })}
            </div>
        </div>
    )
}
