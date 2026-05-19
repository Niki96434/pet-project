import { create } from "zustand";
import { type TaskType } from "./types";
import type { BoardType } from "../../../pages/tasks-page/ui/TasksPage";

interface useDragAndDropState {
    currentBoard: BoardType | null;
    currentItem: TaskType | null;
    boards: BoardType[],

    setCurrentBoard: (boardId: BoardType) => void;
    setCurrentItem: (task: TaskType) => void;

    setBoards: (allBoards: BoardType[]) => void;
}

export const useDragAndDropStore = create<useDragAndDropState>((set) => ({
    currentBoard: null,
    currentItem: null,
    boards: [],

    setCurrentBoard: (board: BoardType) => set({ currentBoard: board }),
    setCurrentItem: (task: TaskType) => set({ currentItem: task }),

    setBoards: (allBoards: BoardType[]) => set({ boards: allBoards }),
}));

export const setCurrentBoard = (state: useDragAndDropState) => state.setCurrentBoard;
export const currBoard = (state: useDragAndDropState) => state.currentBoard;

export const setCurrentItem = (state: useDragAndDropState) => state.setCurrentItem;
export const item = (state: useDragAndDropState) => state.currentItem;

export const handleBoards = (state: useDragAndDropState) => state.setBoards;
export const allBoards = (state: useDragAndDropState) => state.boards;
