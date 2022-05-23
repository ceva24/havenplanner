import { render, screen } from "@testing-library/react";
import Footer from "../../components/footer";

describe("Footer", () => {
    it("renders", () => {
        render(<Footer />);

        const footer = screen.queryByText(
            "Gloomhaven and all related properties, images and text are owned by Cephalofair Games."
        );

        expect(footer).toBeInTheDocument();
    });
});
