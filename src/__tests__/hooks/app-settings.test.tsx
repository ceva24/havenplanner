import { render, screen } from "@testing-library/react";
import AppSettingsProvider, { determineInitialProsperity } from "@/hooks/app-settings";
import PersonalQuest from "@/components/profile/personal-quest";
import { createTestCharacter } from "@/testutils";
import { items } from "@/loaders/items";

const character: Character = createTestCharacter();

describe("app settings provider", () => {
    it("renders children", () => {
        render(
            <AppSettingsProvider character={character}>
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
            render(<PersonalQuest character={character} setCharacter={jest.fn()} />);
        }).toThrowError("No AppSettingsContext Provider found when calling useAppSettingsContext");
    });
});

describe("determineInitialProsperity", () => {
    it("is set to 1 when the character has no items", () => {
        const character = createTestCharacter();

        const prosperity = determineInitialProsperity(character);

        expect(prosperity).toEqual(1);
    });

    it("is set to 1 when the character has prosperity 1 items", () => {
        const character = createTestCharacter({ items: [{ id: "1", item: items[0] }] });

        const prosperity = determineInitialProsperity(character);

        expect(prosperity).toEqual(1);
    });

    it("is set to the level of the highest prosperity item", () => {
        const character = createTestCharacter({
            items: [
                { id: "1", item: items[0] },
                { id: "2", item: items[20] },
            ],
        });

        const prosperity = determineInitialProsperity(character);

        expect(prosperity).toEqual(2);
    });
});
