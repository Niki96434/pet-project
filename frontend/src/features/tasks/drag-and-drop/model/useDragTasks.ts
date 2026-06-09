import { type DropResult } from '@hello-pangea/dnd';
import { type TaskType } from '../../../../entities/tasks';
import { useUpdateTaskStatus } from '../../../../entities/tasks/model/useUpdateTaskStatus';
import type { BoardType } from '../ui/DragAndDrop';

interface useDragTasksType {
    boards: BoardType[];
    setBoards: (boards: BoardType[]) => void;
}

export function useDragTasks({ boards, setBoards }: useDragTasksType) {

    const { updateTaskMutation } = useUpdateTaskStatus();

    const handleDragEnd = async (result: DropResult) => {
        const { destination, source, draggableId, type } = result;

        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        if (type === 'drop-tasks') {
            const previousBoard = boards.find((b) => b.id === Number(source.droppableId));

            if (!previousBoard) {
                console.log('прошлой доски нет');
                return;
            }

            const copyOfSourceItems = [...previousBoard.items];
            const [task] = copyOfSourceItems.splice(source.index, 1);

            const newBoards = boards.map((board) => {
                if (board.id === Number(source.droppableId)) {
                    return { ...board, items: copyOfSourceItems }
                }
                return board
            });

            let taskStatus: TaskType['status'];

            const currentBoard = boards.find((b) => b.id === Number(destination.droppableId));

            if (!currentBoard) {
                console.log('текущей доски нет');
                return;
            }
            const newItems = [...currentBoard.items];
            switch (destination.droppableId) {
                case '0': taskStatus = 'Not completed'; break;
                case '1': taskStatus = 'In process'; break;
                case '2': taskStatus = 'Completed'; break;
                default: taskStatus = task.status;
            }
            const newTask = { ...task, status: taskStatus, id: Number(draggableId) };

            const updatedBoards = newBoards.map((board) => {
                const copyBoard = [...board.items];

                if (destination.droppableId === source.droppableId && board.id === Number(destination.droppableId)) {
                    copyBoard.splice(source.index, 1);
                    copyBoard.splice(destination.index, 0, newTask);
                    return { ...board, items: copyBoard }
                }
                if (board.id === Number(source.droppableId)) {
                    return { ...board, items: copyOfSourceItems }
                }
                if (board.id === Number(destination.droppableId)) {
                    newItems.splice(destination.index, 0, newTask);
                    return { ...board, items: newItems }
                }
                return board
            });

            setBoards(updatedBoards);

            updateTaskMutation.mutate({ id: draggableId, data: newTask });
        }
    }
    return handleDragEnd
}