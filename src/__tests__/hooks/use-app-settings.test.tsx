import { render, screen } from "@testing-library/react";
import AppSettingsProvider from "@/hooks/use-app-settings";
import { createTestAppSettings, createTestCharacter } from "@/testutils";
import ClassSelect from "@/components/profile/class-select";

const character: Character = createTestCharacter();
const appSettings: AppSettings = createTestAppSettings();
const setAppSettings = jest.fn();

describe("app settings provider", () => {
    it("renders children", () => {
        render(
            <AppSettingsProvider appSettings={appSettings} setAppSettings={setAppSettings}>
                <h1>Click me</h1>
            </AppSettingsProvider>
        );

        const children = screen.getByRole("heading", { name: "Click me" });

        expect(children).toBeInTheDocument();
    });
});

describe("useAppSettingsContext", () => {
    it("throws an error when app settings have not been set", () => {
        expect(() => {
            render(<ClassSelect character={character} setCharacter={jest.fn()} />);
        }).toThrowError("No AppSettingsContext Provider found when calling useAppSettingsContext");
    });
});
