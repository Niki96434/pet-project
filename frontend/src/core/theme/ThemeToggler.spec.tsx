import { screen } from "@testing-library/react";
import { render, fireEvent } from "./../../widgets/ui/test-utils";
import { ThemeToggler } from "./ThemeToggler";

describe('ThemeToggler', () => {

    beforeEach(() => localStorage.clear());

    it('should toggle state and update localStorage when clicked', () => {

        render(<ThemeToggler />);

        const toggler = screen.getByRole('checkbox');

        expect(toggler).toBeChecked();
        expect(localStorage.getItem('theme')).toBeNull();

        fireEvent.click(toggler);

        expect(localStorage.getItem('theme')).toBe('dark');
        expect(toggler).not.toBeChecked();
    });

});