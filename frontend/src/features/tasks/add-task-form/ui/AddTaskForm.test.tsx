import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

    it('should show error message when title is shorter than 5 characters', async () => {
        const user = userEvent.setup();
        const input = screen.getByLabelText('Title');
        await user.type(input, 'abc');
        const errorMessage = await screen.findByText(/Минимум 5/);
        expect(errorMessage).toBeTruthy();
    });

    it('should return null when title is longer than 5 characters', async () => {
        const user = userEvent.setup();
        const input = screen.getByLabelText('Title');
        await user.type(input, 'abcde');
        expect(screen.queryByText(/Минимум 5/)).not.toBeTruthy();
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