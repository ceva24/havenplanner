import { render, screen } from "@testing-library/react";
import CopyButton from "@/components/share/copy-button";

describe("copy button", () => {
    it("renders", () => {
        render(<CopyButton shareableLink="Test link" encodeCharacterError={false} />);

        const copyButton = screen.queryByRole("button", { name: "Copy link" });

        expect(copyButton).toBeInTheDocument();
    });

    it("is disabled when there is no shareable link", () => {
        render(<CopyButton shareableLink="" encodeCharacterError={false} />);

        const copyButton = screen.queryByRole("button", { name: "Copy link" });

        expect(copyButton).toBeDisabled();
    });

    it("is disabled when there is a character encoding error", () => {
        render(<CopyButton encodeCharacterError shareableLink="Test link" />);

        const copyButton = screen.queryByRole("button", { name: "Copy link" });

        expect(copyButton).toBeDisabled();
    });
});
