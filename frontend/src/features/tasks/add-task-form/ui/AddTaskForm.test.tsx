import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest"
import { AddTaskForm } from "./AddTaskForm";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function renderAddTaskForm() {
    const queryClient = new QueryClient();
    return render(<QueryClientProvider client={queryClient}>
        <AddTaskForm handleModal={() => { }} />
    </QueryClientProvider>)
}

describe('check title field in AddTaskform', () => {

    beforeEach(() => renderAddTaskForm());
    it('should return title`s label', () => {
        expect(screen.getByLabelText('Title')).toBeTruthy();
    });

    it.fails('should return error message if value`s length min < 5', async () => {
        fireEvent.change(screen.getByLabelText('Title'), {
            target: {
                value: 'abc'
            }
        });

        const errorMessage = await screen.findByText('Минимум 5 символов', { exact: false });
        expect(errorMessage).toBeInTheDocument();
    });


});

describe('check description', () => {

    beforeEach(() => renderAddTaskForm());
    it('should return description`s label', () => {
        expect(screen.getByLabelText('Description')).toBeTruthy();
    });
});

describe('check categories', () => {

    beforeEach(() => renderAddTaskForm());
    it('should return categories label', () => {
        expect(screen.getByLabelText('Categories')).toBeTruthy();
    });
})