import { render, screen } from "@testing-library/react";
import ShareButton, { retrieveAndSetShareableLink } from "@/components/header/share-button";
import * as encoderService from "@/services/encoder";
import { characterClasses } from "@/loaders/class";

const character: Character = {
    name: "Test character",
    experience: 0,
    gold: 0,
    notes: "",
    characterClass: characterClasses[0],
    items: [],
    unlockedAbilityCards: [],
};

const setShareableLink = jest.fn();
const setEncodeCharacterError = jest.fn();

jest.mock("@/services/encoder", () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
        __esModule: true,
        ...jest.requireActual("@/services/encoder"),
    };
});

beforeEach(() => {
    jest.clearAllMocks();
});

describe("share button", () => {
    it("renders", () => {
        render(<ShareButton character={character} />);

        const shareButton = screen.queryByRole("button", { name: "Share" });

        expect(shareButton).toBeInTheDocument();
    });
});

describe("generateAndSetShareableLink", () => {
    it("encodes character data", () => {
        jest.spyOn(encoderService, "encode").mockReturnValueOnce("");

        retrieveAndSetShareableLink(character, "", setShareableLink, setEncodeCharacterError);

        expect(encoderService.encode).toHaveBeenCalledTimes(1);
        expect(encoderService.encode).toHaveBeenCalledWith(character);
    });

    it("sets the shareable link", () => {
        jest.spyOn(encoderService, "encode").mockReturnValueOnce("abcde");

        retrieveAndSetShareableLink(character, "", setShareableLink, setEncodeCharacterError);

        expect(setShareableLink).toHaveBeenCalledTimes(1);
        expect(setShareableLink.mock.calls[0][0]).toMatch(/\?character=abcde/);
    });

    it("does not retrieve the encoded character data if the shareable link is still populated from before", async () => {
        retrieveAndSetShareableLink(character, "abcde", setShareableLink, setEncodeCharacterError);

        expect(encoderService.encode).not.toHaveBeenCalled();
        expect(setShareableLink).not.toHaveBeenCalled();
        expect(setEncodeCharacterError).not.toHaveBeenCalled();
    });

    it("sets an encode character when an unexpected error occurs", async () => {
        jest.spyOn(encoderService, "encode").mockImplementationOnce(() => {
            throw new Error("Error");
        });

        retrieveAndSetShareableLink(character, "", setShareableLink, setEncodeCharacterError);

        expect(setShareableLink).not.toHaveBeenCalled();

        expect(setEncodeCharacterError).toHaveBeenCalledTimes(1);
        expect(setEncodeCharacterError).toHaveBeenCalledWith(true);
    });
});
