import { render, screen } from "@testing-library/react";
import AbilityCards from "@/components/ability-cards/ability-cards";
import { defaultCharacter } from "@/constants";
import AppSettingsProvider from "@/hooks/app-settings";

const setCharacter = jest.fn();

describe("ability cards", () => {
    it("renders the create hand button", () => {
        render(
            <AppSettingsProvider character={defaultCharacter}>
                <AbilityCards character={defaultCharacter} setCharacter={setCharacter} />
            </AppSettingsProvider>
        );

        const createHandButton = screen.queryByRole("button", { name: "Create hand" });

        expect(createHandButton).toBeInTheDocument();
    });

    it("renders the deck by default", () => {
        render(
            <AppSettingsProvider character={defaultCharacter}>
                <AbilityCards character={defaultCharacter} setCharacter={setCharacter} />
            </AppSettingsProvider>
        );

        const level1Cards = screen.queryByRole("region", { name: "Level 1 Ability Cards" });

        expect(level1Cards).toBeInTheDocument();
    });
});
