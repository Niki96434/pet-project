import { parseDate, type DateValue, type DatePickerValueChangeDetails } from "@chakra-ui/react";
import { useState } from "react";

export function useTasksByDay() {
    const [value, setValue] = useState<DateValue[]>([parseDate('2025-04-06')]);

    const handleSelectDay = (details: DatePickerValueChangeDetails) => {
        setValue(details.value);
        console.log(details.value);
    }

    return {
        handleSelectDay, value
    }

}