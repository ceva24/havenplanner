import { render, screen } from "@testing-library/react";
import SettingsButton, { removeItemsAboveProsperityLevel } from "@/components/header/settings-button";
import { createTestCharacter, TestAppSettingsProvider } from "@/testutils";
import { items } from "@/loaders/items";

const setCharacter = jest.fn();

beforeEach(() => {
    jest.resetAllMocks();
});

describe("settings button", () => {
    it("renders", () => {
        render(<SettingsButton character={createTestCharacter()} setCharacter={setCharacter} />, {
            wrapper: TestAppSettingsProvider,
        });

        const settingsButton = screen.queryByRole("button", { name: "Settings" });

        expect(settingsButton).toBeInTheDocument();
    });
});

describe("removeItemsAboveProsperityLevel", () => {
    it("removes an item higher than the current prosperity level", () => {
        const character: Character = createTestCharacter({
            items: [{ id: "1", item: items[20] }],
        });

        removeItemsAboveProsperityLevel(character, setCharacter, 1);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            items: [],
        });
    });

    it("does not remove an item equal to the current prosperity level", () => {
        const character: Character = createTestCharacter({
            items: [{ id: "1", item: items[0] }],
        });

        removeItemsAboveProsperityLevel(character, setCharacter, 1);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith(character);
    });

    it("does not remove an item lower than the current prosperity level", () => {
        const character: Character = createTestCharacter({
            items: [{ id: "1", item: items[0] }],
        });

        removeItemsAboveProsperityLevel(character, setCharacter, 2);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith(character);
    });

    it("removes items higher than the current prosperity level and does not remove items lower than the current prosperity level", () => {
        const character: Character = createTestCharacter({
            items: [
                { id: "1", item: items[0] },
                { id: "2", item: items[20] },
            ],
        });

        removeItemsAboveProsperityLevel(character, setCharacter, 1);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            items: [{ id: "1", item: items[0] }],
        });
    });
});
