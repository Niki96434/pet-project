import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest"
import { AddTaskForm } from "./AddTaskForm";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function renderAddTaskForm() {
    const queryClient = new QueryClient();
    const user = userEvent.setup();
    const utils = render(<QueryClientProvider client={queryClient}>
        <AddTaskForm handleModal={() => { }} />
    </QueryClientProvider>)
    return { user, utils }
}

describe('check title field in AddTaskform', () => {

    it('should show error message when title is shorter than 5 characters', async () => {
        const { user } = renderAddTaskForm()
        const input = screen.getByLabelText('title-label');
        await user.type(input, 'abc');
        const errorMessage = await screen.findByText(/Минимум 5/);
        screen.debug();
        expect(errorMessage).toBeTruthy();
    });

    it('should return null when title is longer than 5 characters', async () => {
        const { user } = renderAddTaskForm()
        const input = screen.getByLabelText('title-label');
        await user.type(input, 'abcde');
        expect(screen.queryByText(/Минимум 5/)).not.toBeTruthy();
    });

});

describe('check description', () => {

    it('should return null if description is not empty', async () => {
        const { user } = renderAddTaskForm()
        const input = screen.getByLabelText('description-label');
        await user.type(input, 'a');
        const errorMessage = screen.queryByText(/должно быть заполнено/);
        expect(errorMessage).not.toBeTruthy();
    });

    it('should return true if description is empty', async () => {
        const { user } = renderAddTaskForm()
        const input = screen.getByLabelText('description-label');
        await user.type(input, 'hello');
        await user.clear(input);
        const errorMessage = await screen.findByText(/должно быть заполнено/);
        expect(errorMessage).toBeTruthy();
    });
});

describe('check categories', () => {

    beforeEach(() => renderAddTaskForm());
    it('should return categories label', () => {
        expect(screen.getByLabelText('Categories')).toBeTruthy();
    });
})