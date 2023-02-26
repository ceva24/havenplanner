import { render, screen, within } from "@testing-library/react";
import LoadCharacterDialog from "@/components/load/load-character-dialog";
import { createTestAppSettings, createTestCharacter, TestAppSettingsProvider } from "@/testutils";
import { itemGroups } from "@/loaders/item-groups";

jest.mock("next/router", () => {
    return {
        useRouter: jest.fn(),
    };
});

const character = createTestCharacter();
const appSettings = createTestAppSettings();
const setCharacter = jest.fn();

describe("load character dialog", () => {
    it("renders when the character has spoilers", () => {
        render(
            <LoadCharacterDialog
                characterHasSpoilers
                spoilerSettings={appSettings.spoilerSettings}
                character={character}
                setCharacter={setCharacter}
            />,
            { wrapper: TestAppSettingsProvider }
        );

        const dialog = screen.queryByRole("dialog", { name: "Load character?" });

        expect(dialog).toBeInTheDocument();
    });

    it("does not render when the character does not have spoilers", () => {
        render(
            <LoadCharacterDialog
                spoilerSettings={appSettings.spoilerSettings}
                characterHasSpoilers={false}
                character={character}
                setCharacter={setCharacter}
            />,
            { wrapper: TestAppSettingsProvider }
        );

        const dialog = screen.queryByRole("dialog", { name: "Load character?" });

        expect(dialog).not.toBeInTheDocument();
    });

    it("renders the prosperity when it is above 1", () => {
        render(
            <LoadCharacterDialog
                characterHasSpoilers
                spoilerSettings={
                    createTestAppSettings({ spoilerSettings: { prosperity: 2, itemGroups: [] } }).spoilerSettings
                }
                character={character}
                setCharacter={setCharacter}
            />,
            { wrapper: TestAppSettingsProvider }
        );

        const dialog = screen.getByRole("dialog", { name: "Load character?" });

        const prosperity = within(dialog).queryByText("Prosperity 2");

        expect(prosperity).toBeInTheDocument();
    });

    it("renders the active item groups", () => {
        render(
            <LoadCharacterDialog
                characterHasSpoilers
                spoilerSettings={
                    createTestAppSettings({ spoilerSettings: { prosperity: 2, itemGroups } }).spoilerSettings
                }
                character={character}
                setCharacter={setCharacter}
            />,
            { wrapper: TestAppSettingsProvider }
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
                spoilerSettings={
                    createTestAppSettings({ spoilerSettings: { prosperity: 2, itemGroups: [] } }).spoilerSettings
                }
                character={character}
                setCharacter={setCharacter}
            />,
            { wrapper: TestAppSettingsProvider }
        );

        const dialog = screen.getByRole("dialog", { name: "Load character?" });

        const cancelButton = within(dialog).queryByRole("button", { name: "Cancel" });

        expect(cancelButton).toBeInTheDocument();
    });

    it("renders the load button", () => {
        const prosperityTwoAppSettings: AppSettings = createTestAppSettings({
            spoilerSettings: { prosperity: 2, itemGroups: [] },
        });

        render(
            <LoadCharacterDialog
                characterHasSpoilers
                spoilerSettings={prosperityTwoAppSettings.spoilerSettings}
                character={character}
                setCharacter={setCharacter}
            />,
            { wrapper: TestAppSettingsProvider }
        );

        const dialog = screen.getByRole("dialog", { name: "Load character?" });

        const loadButton = within(dialog).queryByRole("button", { name: "Load" });

        expect(loadButton).toBeInTheDocument();
    });
});
