import { render, screen } from "@testing-library/react";
import AbilityCards from "@/components/ability-cards/ability-cards";
import { defaultCharacter } from "@/utils/constants";
import AppSettingsProvider from "@/hooks/app-settings";

const setCharacter = jest.fn();

describe("ability cards", () => {
    it("renders the show hand switch", () => {
        render(
            <AppSettingsProvider character={defaultCharacter}>
                <AbilityCards character={defaultCharacter} setCharacter={setCharacter} />
            </AppSettingsProvider>
        );

        const handSwitch = screen.queryByRole("checkbox", { name: "Show hand" });

        expect(handSwitch).toBeInTheDocument();
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
