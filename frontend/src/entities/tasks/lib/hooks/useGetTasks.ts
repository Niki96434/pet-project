import { useEffect, useState } from "react";
import type { TaskType } from "../../model/types";
import { getTasks } from "../../api/getTasks";

export function useGetTasks() {
    const [tasks, setTasks] = useState<TaskType[] | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const data = await getTasks();
            setTasks(data);
            setLoading(false);
        }
        loadData();
    }, []);
    return { tasks, isLoading }
}
