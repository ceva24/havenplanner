import { characterClasses } from "@/loaders/class";

const baseImageUrl = "https://images.ghplanner.app";

const defaultCharacter: Character = {
    name: "",
    experience: 0,
    gold: 0,
    notes: "",
    characterClass: characterClasses[0],
    items: [],
    unlockedAbilityCards: [],
};

export { baseImageUrl, defaultCharacter };
