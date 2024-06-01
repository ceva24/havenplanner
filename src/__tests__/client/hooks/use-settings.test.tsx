import { render, screen } from "@testing-library/react";
import SettingsProvider from "@/client/hooks/use-settings";
import { createTestSettings, createTestCharacter } from "@/test/create-test-fixtures";
import ClassSelect from "@/client/components/profile/class-select";

const character: Character = createTestCharacter();
const settings: Settings = createTestSettings();
const setSettings = jest.fn();

describe("settings provider", () => {
    it("renders children", () => {
        render(
            <SettingsProvider settings={settings} setSettings={setSettings}>
                <h1>Click me</h1>
            </SettingsProvider>,
        );

        const children = screen.getByRole("heading", { name: "Click me" });

        expect(children).toBeInTheDocument();
    });
});

describe("useSettingsContext", () => {
    it("throws an error when settings have not been set", () => {
        expect(() => {
            render(<ClassSelect character={character} setCharacter={jest.fn()} />);
        }).toThrowError("No SettingsContext Provider found when calling useSettingsContext");
    });
});
