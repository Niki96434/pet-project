import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest"
import { AddTaskForm } from "./AddTaskForm";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function renderAddTaskForm() {
    const queryClient = new QueryClient();
    return render(<QueryClientProvider client={queryClient}>
        <AddTaskForm handleModal={() => { }} />
    </QueryClientProvider>)
}

describe('AddTaskform', () => {

    beforeEach(() => renderAddTaskForm());
    it('should return title`s label', () => {
        expect(screen.getByLabelText('Title')).toBeTruthy();
    });

    it('should return description`s label', () => {
        expect(screen.getByLabelText('Description')).toBeTruthy();
    });

    it('should return categories label', () => {
        expect(screen.getByLabelText('Categories')).toBeTruthy();
    });
});