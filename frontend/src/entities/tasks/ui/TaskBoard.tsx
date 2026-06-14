import Task from "./Task";
import './TaskBoard.css';
import TaskListHeader from "./TaskListHeader";
import headerIcon from './../../../assets/Category.svg';
import type { Task as TaskModel } from "../model/types";
import { Draggable } from "@hello-pangea/dnd";

interface TaskBoardProps {
    handleModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
    tasks: TaskModel[];
    children: React.ReactNode;
}

export function TaskBoard({ handleModal, tasks, children }: TaskBoardProps) {

    return (
        <div className="list-container" onClick={(e) => e.stopPropagation()}>
            <TaskListHeader handleModal={handleModal} headerIcon={headerIcon} children={children} />
            <hr />
            <div className="task-list">
                {tasks.map((task: TaskModel, index: number) => (
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
