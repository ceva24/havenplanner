import { characterClasses } from "@/loaders/character-classes";

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

export { baseImageUrl, defaultCharacter };
