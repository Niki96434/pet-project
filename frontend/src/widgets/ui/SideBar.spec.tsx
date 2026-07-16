import { render, screen } from "@testing-library/react";
import { SideBar } from "./SideBar";

describe('sidebar', () => {

    it('should display app logo in the sidebar', () => {
        render(<SideBar />);

        const imgElement = screen.getByAltText('logo');

        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toMatchSnapshot();
    });
});