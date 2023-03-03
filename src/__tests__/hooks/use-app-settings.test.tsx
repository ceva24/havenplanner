import { render, screen } from "@testing-library/react";
import SettingsProvider from "@/hooks/use-settings";
import { createTestSettings, createTestCharacter } from "@/testutils";
import ClassSelect from "@/components/profile/class-select";

const character: Character = createTestCharacter();
const settings: Settings = createTestSettings();
const setSettings = jest.fn();

describe("app settings provider", () => {
    it("renders children", () => {
        render(
            <SettingsProvider settings={settings} setSettings={setSettings}>
                <h1>Click me</h1>
            </SettingsProvider>
        );

        const children = screen.getByRole("heading", { name: "Click me" });

        expect(children).toBeInTheDocument();
    });
});

describe("useSettingsContext", () => {
    it("throws an error when app settings have not been set", () => {
        expect(() => {
            render(<ClassSelect character={character} setCharacter={jest.fn()} />);
        }).toThrowError("No SettingsContext Provider found when calling useSettingsContext");
    });
});
