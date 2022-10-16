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

const defaultAttackModifierDeck: Array<[AttackModifierCard, number]> = [
    [attackModifiers[0], 1], // 2x
    [attackModifiers[1], 1], // +2
    [attackModifiers[2], 5], // +1
    [attackModifiers[3], 6], // +0
    [attackModifiers[4], 5], // -1
    [attackModifiers[5], 1], // -2
    [attackModifiers[6], 1], // Miss
];

export { baseImageUrl, defaultCharacter, defaultAttackModifierDeck };
