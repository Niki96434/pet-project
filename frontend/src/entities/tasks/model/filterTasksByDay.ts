import { type TaskType } from "./types";
import { type DateValue } from "@chakra-ui/react";

const filterByDay = (task: TaskType, date: DateValue[]) => {
    const dateTask = `${date[0].day > 10 ? date[0].day : '0' + date[0].day}.${date[0].month > 10 ? date[0].month : '0' + date[0].month}.${date[0].year}`;
    if (task.deadlineDate !== dateTask) {
        return false
    } else {
        return true
    }
}

export const filterTasksByDay = (tasks: TaskType[], date: DateValue[]) => {
    const filteredTasks = tasks.filter((task) => filterByDay(task, date));
    return filteredTasks
}
