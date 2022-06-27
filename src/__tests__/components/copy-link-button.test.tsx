import { render, screen } from "@testing-library/react";
import CopyLinkButton from "@/components/copy-link-button";

describe("copy link button", () => {
    it("renders", () => {
        render(<CopyLinkButton shareableLink="Test link" encodeCharacterError={false} />);

        const copyLinkButton = screen.queryByRole("button", { name: "Copy link" });

        expect(copyLinkButton).toBeInTheDocument();
    });

    it("is disabled when there is no shareable link", () => {
        render(<CopyLinkButton shareableLink="" encodeCharacterError={false} />);

        const copyLinkButton = screen.queryByRole("button", { name: "Copy link" });

        expect(copyLinkButton).toBeDisabled();
    });

    it("is disabled when there is a character encoding error", () => {
        render(<CopyLinkButton encodeCharacterError shareableLink="Test link" />);

        const copyLinkButton = screen.queryByRole("button", { name: "Copy link" });

        expect(copyLinkButton).toBeDisabled();
    });
});
