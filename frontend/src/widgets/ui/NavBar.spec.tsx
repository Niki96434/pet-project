import { screen } from "@testing-library/react";
import { NavBar } from "./NavBar";
import { render, fireEvent } from "./test-utils";

describe('NavBar', () => {

    it('should return only ThemeToggler if isAuth = false', () => {

        render(<NavBar />);
        const theme = 'light';

        const toggler = screen.getByRole('checkbox', { checked: theme === 'light' });

        expect(toggler).toBeInTheDocument();

    });

    it('should return UserCard and DropDownButton if isAuth = true', () => {

        render(<NavBar />);

        const username = 'nikki';

        screen.getByText(username[0]);

        const button = screen.getByAltText('user-menu');

        // expect(button).toBeInTheDocument();

        fireEvent.click(button);
        expect(screen.getByText(/аккаунт настройки выйти/i)).toBeInTheDocument();

    });
});