import { render, screen } from "@testing-library/react";
import SettingsButton, { removeSpoilerItems } from "@/components/header/settings-button";
import {
    createTestSettings,
    createTestCharacter,
    createTestSettingsWithSpoilerSettings,
    TestSettingsProvider,
} from "@/testutils";
import { items } from "@/loaders/items";

const setCharacter = jest.fn();
const spoilerSettings = createTestSettings().spoilerSettings;

beforeEach(() => {
    jest.resetAllMocks();
});

describe("settings button", () => {
    it("renders", () => {
        render(<SettingsButton character={createTestCharacter()} setCharacter={setCharacter} />, {
            wrapper: TestSettingsProvider,
        });

        const settingsButton = screen.queryByRole("button", { name: "Settings" });

        expect(settingsButton).toBeInTheDocument();
    });
});

describe("removeSpoilerItems", () => {
    it("removes an item higher than the current prosperity level", () => {
        const character: Character = createTestCharacter({
            items: [{ id: "1", item: items[20] }],
        });

        removeSpoilerItems(character, setCharacter, spoilerSettings);

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

        removeSpoilerItems(character, setCharacter, spoilerSettings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith(character);
    });

    it("does not remove an item lower than the current prosperity level", () => {
        const character: Character = createTestCharacter({
            items: [{ id: "1", item: items[0] }],
        });

        const prosperityTwoSettings = createTestSettingsWithSpoilerSettings(2, []);

        removeSpoilerItems(character, setCharacter, prosperityTwoSettings.spoilerSettings);

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

        removeSpoilerItems(character, setCharacter, spoilerSettings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            items: [{ id: "1", item: items[0] }],
        });
    });

    it("removes items not in the active item groups", () => {
        const character: Character = createTestCharacter({
            items: [{ id: "1", item: items[25] }],
        });

        removeSpoilerItems(character, setCharacter, spoilerSettings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            items: [],
        });
    });

    it("does not remove items in the active item groups", () => {
        const item = items[25];

        const character: Character = createTestCharacter({
            items: [{ id: "1", item }],
        });

        const settings = createTestSettingsWithSpoilerSettings(2, [{ id: 1, name: item.group }]);

        removeSpoilerItems(character, setCharacter, settings.spoilerSettings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith(character);
    });
});
