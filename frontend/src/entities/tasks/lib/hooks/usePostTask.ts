import { useState } from "react";
import postTask from "../../api/postTask";
import type { FormDataType } from "../../model/types";

export default function usePostTask(data: FormDataType) {
    const [isLoading, setLoading] = useState<boolean>(false);
    const loadData = async () => {
        setLoading(true);
        const task = await postTask(data);
        setLoading(false);
        return task
    }

    return { loadData, isLoading }
}