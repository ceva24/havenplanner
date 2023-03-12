import { render, screen, within } from "@testing-library/react";
import LoadCharacterDialog from "@/components/load/load-character-dialog";
import {
    createTestSettings,
    createTestCharacter,
    createTestSettingsWithItemSpoilers,
    createTestItemGroup,
} from "@/test/create-test-fixtures";
import { TestSettingsProvider } from "@/test/test-settings-provider";

jest.mock("next/router", () => {
    return {
        useRouter: jest.fn(),
    };
});

const character: Character = createTestCharacter();
const settings: Settings = createTestSettings();
const setCharacter = jest.fn();

describe("load character dialog", () => {
    it("renders when the character has spoilers", () => {
        render(
            <LoadCharacterDialog
                characterHasSpoilers
                newSpoilerSettings={settings.spoilerSettings}
                character={character}
                setCharacter={setCharacter}
            />,
            { wrapper: TestSettingsProvider }
        );

        const dialog = screen.queryByRole("dialog", { name: "Load character?" });

        expect(dialog).toBeInTheDocument();
    });

    it("does not render when the character does not have spoilers", () => {
        render(
            <LoadCharacterDialog
                newSpoilerSettings={settings.spoilerSettings}
                characterHasSpoilers={false}
                character={character}
                setCharacter={setCharacter}
            />,
            { wrapper: TestSettingsProvider }
        );

        const dialog = screen.queryByRole("dialog", { name: "Load character?" });

        expect(dialog).not.toBeInTheDocument();
    });

    it("renders character class spoilers", () => {
        const settings: Settings = createTestSettings();
        settings.spoilerSettings.classes = [{ id: 2, imageUrl: "", spoilerSafeName: "Test Spoilery" }];

        render(
            <LoadCharacterDialog
                characterHasSpoilers
                newSpoilerSettings={settings.spoilerSettings}
                character={character}
                setCharacter={setCharacter}
            />,
            { wrapper: TestSettingsProvider }
        );

        const dialog = screen.getByRole("dialog", { name: "Load character?" });

        const characterClass = within(dialog).queryByText("Test Spoilery");

        expect(characterClass).toBeInTheDocument();
    });

    it("renders the prosperity when it is above 1", () => {
        render(
            <LoadCharacterDialog
                characterHasSpoilers
                newSpoilerSettings={createTestSettingsWithItemSpoilers(2, []).spoilerSettings}
                character={character}
                setCharacter={setCharacter}
            />,
            { wrapper: TestSettingsProvider }
        );

        const dialog = screen.getByRole("dialog", { name: "Load character?" });

        const prosperity = within(dialog).queryByText("Prosperity 2");

        expect(prosperity).toBeInTheDocument();
    });

    it("renders the active item groups", () => {
        const itemGroups: ItemGroup[] = [
            createTestItemGroup(1, "Random Item Designs"),
            createTestItemGroup(2, "Solo Scenario Items"),
        ];
        render(
            <LoadCharacterDialog
                characterHasSpoilers
                newSpoilerSettings={createTestSettingsWithItemSpoilers(2, itemGroups).spoilerSettings}
                character={character}
                setCharacter={setCharacter}
            />,
            { wrapper: TestSettingsProvider }
        );

        const dialog = screen.getByRole("dialog", { name: "Load character?" });

        const randomItemDesigns = within(dialog).queryByText("Random Item Designs");
        const soloScenarioItems = within(dialog).queryByText("Solo Scenario Items");

        expect(randomItemDesigns).toBeInTheDocument();
        expect(soloScenarioItems).toBeInTheDocument();
    });

    it("renders the cancel button", () => {
        render(
            <LoadCharacterDialog
                characterHasSpoilers
                newSpoilerSettings={createTestSettingsWithItemSpoilers(2, []).spoilerSettings}
                character={character}
                setCharacter={setCharacter}
            />,
            { wrapper: TestSettingsProvider }
        );

        const dialog = screen.getByRole("dialog", { name: "Load character?" });

        const cancelButton = within(dialog).queryByRole("button", { name: "Cancel" });

        expect(cancelButton).toBeInTheDocument();
    });

    it("renders the load button", () => {
        const prosperityTwoSpoilerSettings = createTestSettingsWithItemSpoilers(2, []).spoilerSettings;

        render(
            <LoadCharacterDialog
                characterHasSpoilers
                newSpoilerSettings={prosperityTwoSpoilerSettings}
                character={character}
                setCharacter={setCharacter}
            />,
            { wrapper: TestSettingsProvider }
        );

        const dialog = screen.getByRole("dialog", { name: "Load character?" });

        const loadButton = within(dialog).queryByRole("button", { name: "Load" });

        expect(loadButton).toBeInTheDocument();
    });
});
