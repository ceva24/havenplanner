import { render, screen, within } from "@testing-library/react";
import ShareDialog from "@/components/share/share-dialog";

describe("share dialog", () => {
    it("renders", () => {
        render(<ShareDialog isOpen shareableLink="" encodeCharacterError={false} onClose={() => ""} />);

        const shareDialog = screen.queryByRole("dialog", { name: "Share" });

        expect(shareDialog).toBeInTheDocument();
    });

    it("renders the shareable link", () => {
        render(<ShareDialog isOpen shareableLink="Test link" encodeCharacterError={false} onClose={() => ""} />);

        const shareDialog = screen.getByRole("dialog", { name: "Share" });

        const shareableLinkTextField = within(shareDialog).queryByRole("textbox", { name: "Link" });

        expect(shareableLinkTextField).toHaveValue("Test link");
    });

    it("renders an error message when an error has occurred encoding character data", () => {
        render(<ShareDialog encodeCharacterError isOpen shareableLink="Test link" onClose={() => ""} />);

        const shareDialog = screen.getByRole("dialog", { name: "Share" });

        const shareableLinkTextField = within(shareDialog).queryByRole("textbox", { name: "Link" });

        expect(shareableLinkTextField).toHaveValue("Error");
    });
});
