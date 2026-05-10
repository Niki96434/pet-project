import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import {
    createViewDay,
    createViewWeekAgenda,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
    viewMonthGrid
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import 'temporal-polyfill/global';
import '@schedule-x/theme-default/dist/index.css';
import { useState, useEffect } from 'react';
import { type TaskType } from '../../../entities/tasks/model/types';
import './BigCalendar.css';

interface BigCalendarProps {
    tasks: TaskType[]
}

export function BigCalendar({ tasks }: BigCalendarProps) {
    const eventsService = useState(() => createEventsServicePlugin())[0];

    const calendar = useCalendarApp({
        views: [createViewDay(), createViewWeekAgenda(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
        events: [],
        plugins: [eventsService],
        locale: 'ru-RU',
        isDark: false,
        defaultView: viewMonthGrid.name
    });

    useEffect(() => {
        const events = tasks.map((task) => ({
            id: task.id.toString(),
            title: task.title,
            start: Temporal.PlainDate.from(task.deadlineDate),
            end: Temporal.PlainDate.from(task.deadlineDate),
        }));
        eventsService.set(events);
    }, [tasks, eventsService])

    return (
        <div className='sx-react-calendar-wrapper'>
            <ScheduleXCalendar calendarApp={calendar} />
        </div>
    )
}