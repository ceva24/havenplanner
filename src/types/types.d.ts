declare module "react-flippy";

interface Flippy {
    toggle: () => void;
}

interface AppSettings {
    showPersonalQuestButton: boolean;
    showPersonalQuest: boolean;
    showHand: boolean;
}

interface Character {
    name: string;
    experience: number;
    gold: number;
    notes: string;
    characterClass: CharacterClass;
    personalQuest?: PersonalQuest;
    items: CharacterItem[];
    unlockedAbilityCards: AbilityCard[];
}

interface CharacterItem {
    id: string;
    item: Item;
}

interface Asset {
    id: number;
    name: string;
    imageUrl: string;
}

interface CharacterClass extends Asset {
    characterMatFrontImageUrl: string;
    characterMatBackImageUrl: string;
    handSize: number;
    abilityCards: AbilityCard[];
}

interface PersonalQuest extends Asset {}

interface Item extends Asset {
    slot: string;
}

interface AbilityCard extends Asset {
    level: string;
}
