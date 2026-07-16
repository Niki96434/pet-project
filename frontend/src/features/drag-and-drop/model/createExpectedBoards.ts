import type { Task } from "../../../entities/tasks"
import type { Board } from "../ui/DragAndDrop"

export const createExpectedBoards = (
    notCompleted: Task[] = [],
    inProcess: Task[] = [],
    completed: Task[] = []): Board[] => {
    return [
        { id: 1, title: 'Not completed', items: notCompleted },
        { id: 2, title: 'In process', items: inProcess },
        { id: 3, title: 'Completed', items: completed }
    ]
}