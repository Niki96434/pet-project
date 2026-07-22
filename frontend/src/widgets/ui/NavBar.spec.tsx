import { screen } from "@testing-library/react";
import { NavBar } from "./NavBar";
import { render, fireEvent } from "./test-utils";

describe('navbar', () => {

    it('checking the ThemeToggler changes when clicked', () => {

        render(<NavBar />);
        const theme = 'light';
        const toggler = screen.getByRole('checkbox', { checked: theme === 'light' });
        expect(toggler).toBeInTheDocument();

        fireEvent.click(toggler);

        expect(screen.getByRole('checkbox', { checked: false })).toBeInTheDocument();
    });

});