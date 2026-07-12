import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { TaskBoard } from "../../../../entities/tasks";
import { useTaskModalStore } from "../../../../entities/tasks/model/useTaskModalStore";
import type { TaskState } from './../../../../entities/tasks/model/useTaskModalStore';
import { useDragTasks } from "../model/useDragTasks";
import { getBoardsFromTasks } from "../model/getBoardsFromTasks";
import { useEffect, useMemo, useState } from "react";
import { type Task } from "../../../../entities/tasks";
import './TaskBoards.css';

export interface Board {
    id: number;
    title: string;
    items: Task[];
}

interface TaskBoardsType {
    tasks: Task[];
}

export function TaskBoards({ tasks }: TaskBoardsType) {

    const openAddModal = useTaskModalStore((state: TaskState) => state.openAddModal);

    const [boards, setBoards] = useState<Board[]>([]);

    const initialBoards = useMemo(() => getBoardsFromTasks(tasks), [tasks]);

    useEffect(() => {
        const loadBoards = () => {
            setBoards(initialBoards);
            console.log(initialBoards);
        }
        loadBoards();
    }, [initialBoards]);

    const handleDragEnd = useDragTasks({ boards, setBoards });

    return (
        <div className="list">
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="boards">
                    {boards.map((board) => {
                        return (
                            <Droppable droppableId={String(board.id)} key={board.id} type="drop-tasks">
                                {(provided) => {
                                    return (
                                        <div ref={provided.innerRef} {...provided.droppableProps}>
                                            <TaskBoard tasks={board.items} handleModal={() => openAddModal()}>{board.title}</TaskBoard>
                                            {provided.placeholder}
                                        </div>)
                                }}
                            </Droppable>
                        )
                    })}
                </div>
            </DragDropContext>
        </div>
    )
}