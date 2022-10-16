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
    hand: AbilityCard[];
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
    cardBackImageUrl: string;
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

interface AttackModifierCard extends Asset {}

interface AttackModifierDeckCard {
    card: AttackModifierCard;
    count: number;
}
