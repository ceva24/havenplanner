import { characterClasses } from "@/loaders/character-classes";
import { attackModifiers } from "@/loaders/attack-modifiers";

const baseImageUrl = "https://images.ghplanner.app";

const defaultCharacter: Character = {
    name: "",
    experience: 0,
    gold: 0,
    notes: "",
    characterClass: characterClasses[0],
    items: [],
    unlockedAbilityCards: [],
    hand: [],
};

const baseAttackModifierDeck: AttackModifierDeckCard[] = [
    {
        card: attackModifiers[0], // 2x
        count: 1,
    },
    {
        card: attackModifiers[1], // +2
        count: 1,
    },
    {
        card: attackModifiers[2], // +1
        count: 5,
    },
    {
        card: attackModifiers[3], // +0
        count: 6,
    },
    {
        card: attackModifiers[4], // -1
        count: 5,
    },
    {
        card: attackModifiers[5], // -2
        count: 1,
    },
    {
        card: attackModifiers[6], // Miss
        count: 1,
    },
];

export { baseImageUrl, defaultCharacter, baseAttackModifierDeck };
