import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest"
import { AddTaskForm } from "./AddTaskForm";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function renderAddTaskForm() {
    const queryClient = new QueryClient();
    const user = userEvent.setup();
    const utils = render(<QueryClientProvider client={queryClient}>
        <AddTaskForm handleModal={() => { }} />
    </QueryClientProvider>);
    return { user, utils }
}

describe('check title field in AddTaskform', () => {

    it('should return null when title is shorter than 5 characters', async () => {
        const { user } = renderAddTaskForm()
        const input = screen.getByRole('textbox', { name: 'Title' });
        await user.type(input, 'abc');
        screen.debug();
        expect(await screen.findByText(/минимум 5/i)).toBeInTheDocument();
    });

    it('should return null when title is longer than 5 characters', async () => {
        const { user } = renderAddTaskForm()
        const input = screen.getByRole('textbox', { name: 'Title' });
        await user.type(input, 'abcde');
        expect(screen.queryByText(/минимум 5/i)).toBeNull();
    });

});

describe('check description', () => {

    it('should return null if description is not empty', async () => {
        const { user } = renderAddTaskForm();
        const input = screen.getByRole('textbox', { name: 'Description' });
        await user.type(input, 'a');
        const errorMessage = screen.queryByText(/должно быть заполнено/);
        expect(errorMessage).toBeNull();
    });

    it('should return true if description is empty', async () => {
        const { user } = renderAddTaskForm();
        const input = screen.getByRole('textbox', { name: 'Description' });
        await user.type(input, 'hello');
        await user.clear(input);
        expect(await screen.findByText(/должно быть заполнено/)).toBeInTheDocument();
    });
});

describe('check categories', () => {

    it('should return categories label', () => {
        renderAddTaskForm();
        expect(screen.getByRole('combobox', { name: /Categories/ })).toBeInTheDocument();
    });
});

