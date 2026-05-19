import './Task.css';
import type { TaskType } from '../model/types';
import CategoryBadge from './CategoryBadge';
import DropdownMenu from './DropdownMenu';
import { useMarkStatusQuery } from '../model/useMarkStatusTaskQuery';
import { item, setCurrentBoard, setCurrentItem, useDragAndDropStore, currBoard, handleBoards, allBoards } from '../model/useDragAndDropStore';
import type React from 'react';
import type { BoardType } from '../../../pages/tasks-page/ui/TasksPage';
// import type { BoardType } from '../../../pages/tasks-page/ui/TasksPage';

interface TaskProps {
    task: TaskType;
    board: BoardType;
}

export default function Task({ task, board }: TaskProps) {

    const { changeCheckbox, valueCheckbox } = useMarkStatusQuery(task);

    const currentBoard = useDragAndDropStore(currBoard);
    const currentItem = useDragAndDropStore(item);

    const handleCurrentItem = useDragAndDropStore(setCurrentItem);
    const handleCurrentBoard = useDragAndDropStore(setCurrentBoard);

    const onDragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleCurrentItem(task);
        handleCurrentBoard(board);
    }

    const setBoards = useDragAndDropStore(handleBoards);
    const boards = useDragAndDropStore(allBoards);

    const onDropHandler = (e: React.DragEvent<HTMLDivElement>, board: BoardType, item: TaskType) => {
        e.preventDefault();
        if (!currentBoard || !currentItem) {
            console.log('ни доски, ни задачи нет');
            return;
        }
        const previousIndexItem = currentBoard?.items.indexOf(currentItem);
        currentBoard?.items.splice(previousIndexItem, 1);
        const dropIndex = board.items.indexOf(item);
        board.items.splice(dropIndex + 1, 0, currentItem);
        setBoards(boards.map((b: BoardType) => {
            if (b.id === currentBoard.id) {
                return currentBoard
            } else if (b.id === board.id) {
                return board
            } else {
                return b
            }
        }));

    }

    return (
        <div className="task-card" draggable='true' onDrop={() => (e: React.DragEvent<HTMLDivElement>, board: BoardType, item: TaskType) => onDropHandler(e, board, item)} onDragStart={onDragStartHandler}>
            <DropdownMenu id={task.id} />
            <div className='task-top'>
                <input onClick={changeCheckbox} checked={valueCheckbox} className='task-checkbox' type='checkbox' />
                <p className='task-title'>{task.title}</p>
            </div>
            <div className='category-and-date'>
                <CategoryBadge category={task.category} />
                <div className='task-date'>{task.deadlineDate}</div>
            </div>
        </div>
    )
}