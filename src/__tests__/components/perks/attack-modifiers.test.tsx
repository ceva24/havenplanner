import { render, screen, within } from "@testing-library/react";
import AttackModifiers from "@/components/perks/attack-modifiers";
import { createTestAttackModifierDeckCard, createTestCharacter, createTestSettings } from "@/test/create-test-fixtures";
import { TestSettingsProvider } from "@/test/test-settings-provider";

describe("attack modifiers", () => {
    it("renders the base attack modifiers", () => {
        const settings: Settings = createTestSettings();
        settings.gameData.baseAttackModifierDeck = [createTestAttackModifierDeckCard(1, "+1", 5)];

        render(
            <TestSettingsProvider settings={settings}>
                <AttackModifiers character={createTestCharacter()} />
            </TestSettingsProvider>
        );

        const attackModifierCard = screen.getByRole("img", { name: "+1 card" });

        const attackModifierDeckCard = attackModifierCard.closest("[id^=attack-modifier-card-details]");

        const countResult = within(attackModifierDeckCard as HTMLElement).queryByText("5 x");

        expect(countResult).toBeInTheDocument();
    });

    it("renders the class attack modifiers", () => {
        const perk: Perk = {
            id: 0,
            name: "Add one {+1} Shield {shield} 1, self card",
            count: 1,
            add: [
                {
                    id: 22,
                    name: "+1 shield 1 self",
                    imageUrl: "/attack-modifiers/gloomhaven/BR/gh-am-br-22.webp",
                },
            ],
            remove: [],
        };

        const character: Character = createTestCharacter();
        character.characterClass.perks = [perk];
        character.gainedPerks = [{ checkboxIndex: 0, perk }];

        render(<AttackModifiers character={character} />, { wrapper: TestSettingsProvider });

        const attackModifierCard = screen.getByRole("img", { name: "+1 shield 1 self card" });

        const attackModifierDeckCard = attackModifierCard.closest("[id^=attack-modifier-card-details]");

        const countResult = within(attackModifierDeckCard as HTMLElement).queryByText("1 x");

        expect(countResult).toBeInTheDocument();
    });
});
