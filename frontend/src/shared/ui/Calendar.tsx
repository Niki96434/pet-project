"use client"

import { DatePicker, type DateValue, type DatePickerValueChangeDetails } from "@chakra-ui/react";

interface CalendarProps {
    value: DateValue[];
    onValueChange: (details: DatePickerValueChangeDetails) => void;
}

export function Calendar({ value, onValueChange }: CalendarProps) {
    return (
        <DatePicker.Root selectionMode="range" inline width="fit-content" value={value} onValueChange={onValueChange}>
            <DatePicker.Content unstyled>
                <DatePicker.View view="day">
                    <DatePicker.Header />
                    <DatePicker.DayTable />
                </DatePicker.View>
                <DatePicker.View view="month">
                    <DatePicker.Header />
                    <DatePicker.MonthTable />
                </DatePicker.View>
                <DatePicker.View view="year">
                    <DatePicker.Header />
                    <DatePicker.YearTable />
                </DatePicker.View>
            </DatePicker.Content>
        </DatePicker.Root>
    )
}
