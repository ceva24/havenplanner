import { render, screen, within } from "@testing-library/react";
import ShareLinkDialog from "@/components/share-link-dialog";

describe("share link dialog", () => {
    it("renders the dialog", () => {
        render(<ShareLinkDialog isOpen shareableLink="" encodeCharacterError={false} onClose={() => ""} />);

        const shareLinkModal = screen.queryByRole("dialog", { name: "Share link" });

        expect(shareLinkModal).toBeInTheDocument();
    });

    it("renders the shareable link", () => {
        render(<ShareLinkDialog isOpen shareableLink="Test link" encodeCharacterError={false} onClose={() => ""} />);

        const shareLinkModal = screen.getByRole("dialog", { name: "Share link" });

        const shareableLinkTextField = within(shareLinkModal).queryByRole("textbox", { name: "Link" });

        expect(shareableLinkTextField).toHaveValue("Test link");
    });

    it("renders an error message when an error has occurred encoding character data", () => {
        render(<ShareLinkDialog encodeCharacterError isOpen shareableLink="Test link" onClose={() => ""} />);

        const shareLinkModal = screen.getByRole("dialog", { name: "Share link" });

        const shareableLinkTextField = within(shareLinkModal).queryByRole("textbox", { name: "Link" });

        expect(shareableLinkTextField).toHaveValue("Error");
    });
});
