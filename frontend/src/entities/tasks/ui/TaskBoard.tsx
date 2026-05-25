import Task from "./Task";
import './TaskBoard.css';
import HeaderTaskList from "./HeaderTaskList";
import headerIcon from './../../../assets/Category.svg';
import type { TaskType } from "../model/types";
import { Draggable } from "@hello-pangea/dnd";

interface TaskBoardProps {
    handleModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
    tasks: TaskType[];
    children: React.ReactNode;
}

export function TaskBoard({ handleModal, tasks, children }: TaskBoardProps) {

    return (
        <div className="list-container" onClick={(e) => e.stopPropagation()}>
            <HeaderTaskList handleModal={handleModal} headerIcon={headerIcon} children={children} />
            <hr />
            <div className="task-list">
                {tasks.map((task: TaskType, index: number) => (
                    <Draggable draggableId={String(task.id)} index={index}>
                        {(provided) => (
                            <div
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                                {...provided.dragHandleProps}>
                                <Task key={task.id} task={task} />
                            </div>
                        )}
                    </Draggable>))}
            </div>
        </div>
    )
}
