import { type TaskType } from "./types";
import { type DateValue } from "@chakra-ui/react";

const filterByDay = (task: TaskType, date: DateValue[]) => {
    const firstDate = new Date(`${date[0].year}-${date[0].month > 10 ? date[0].month : '0' + date[0].month}-${date[0].day > 10 ? date[0].day : '0' + date[0].day}`);
    const lastDate = new Date(date[1] ? `${date[1].year}-${date[1].month > 10 ? date[1].month : '0' + date[1].month}-${date[1].day > 10 ? date[1].day : '0' + date[1].day}` : firstDate);
    const taskDate = task.deadlineDate.split('.');
    const newISOFormatDate = new Date(taskDate[2] + '-' + taskDate[1] + '-' + taskDate[0]);
    console.log(newISOFormatDate);
    if (newISOFormatDate >= firstDate && newISOFormatDate <= lastDate) {
        return true
    }
}

export const filterTasksByDay = (tasks: TaskType[], date: DateValue[]) => {
    const filteredTasks = tasks.filter((task) => filterByDay(task, date));
    return filteredTasks
}
