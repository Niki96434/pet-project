import { type TaskType } from "./types";
import { type DateValue } from "@chakra-ui/react";

const filterByDay = (task: TaskType, date: DateValue[]) => {
    const firstDate = new Date(`${date[0].year}-${date[0].month > 9 ? date[0].month : '0' + date[0].month}-${date[0].day > 9 ? date[0].day : '0' +
        date[0].day}T00:00:00`);
    const lastDate = new Date(date[1] ? `${date[1].year}-${date[1].month > 9 ? date[1].month : '0' + date[1].month}-${date[1].day > 9 ? date[1].day : '0' +
        date[1].day}T23:59:59` : firstDate.getTime() + 86399999);
    const newISOFormatDate = new Date(`${task.deadlineDate}T12:00:00`);
    if (newISOFormatDate >= firstDate && newISOFormatDate <= lastDate) {
        return true
    }
}

export const filterTasksByDay = (tasks: TaskType[], date: DateValue[]) => {
    const filteredTasks = tasks.filter((task) => filterByDay(task, date));
    return filteredTasks
}
