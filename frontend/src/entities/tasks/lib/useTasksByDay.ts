import { type DateValue, type DatePickerValueChangeDetails, parseDate } from "@chakra-ui/react";
import { useState } from "react";

export function useTasksByDay() {
    const [value, setValue] = useState<DateValue[]>([parseDate('2026-05-04')]);

    const handleSelectDay = (details: DatePickerValueChangeDetails) => {
        setValue(details.value);
    }
    return {
        handleSelectDay, value
    }
}