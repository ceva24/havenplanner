interface AppSettings {
    showPersonalQuestButton: boolean;
    showPersonalQuest: boolean;
    selectedAbilityCardsTabIndex: number;
}

interface Character {
    name: string;
    experience: number;
    gold: number;
    notes: string;
    characterClass: CharacterClass;
    personalQuest?: PersonalQuest;
    unlockedAbilityCards: AbilityCard[];
    hand: AbilityCard[];
    gainedEnhancements: GainedEnhancement[];
    gainedPerks: GainedPerk[];
    battleGoalCheckmarkGroups: BattleGoalCheckmarkGroup[];
    items: CharacterItem[];
}

interface SerializedCharacter {
    n: string; // Name
    x: number; // Experience
    g: number; // Gold
    d: string; // Notes
    c: number; // Character id
    q?: number; // Personal quest id
    i: number[]; // Item ids
    u: number[]; // Unlocked ability card ids
    h: number[]; // Hand ability card ids
    p: Array<[number, number]>; // Gained perk and checkbox indices
    b: boolean[][]; // Gained battle goal checkmark groups
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
    perks: Perk[];
}

interface PersonalQuest extends Asset {}

interface Item extends Asset {
    slot: string;
}

interface AbilityCard extends Asset {
    level: string;
}

interface AttackModifierCard extends Asset {}

interface Enhancement extends Asset {}

interface AttackModifierDeckCard {
    card: AttackModifierCard;
    count: number;
}

interface Perk {
    description: string;
    count: number;
    add: AttackModifierCard[];
    remove: AttackModifierCard[];
}

interface GainedPerk {
    perk: Perk;
    checkboxIndex: number;
}

interface BattleGoalCheckmarkGroup {
    id: number;
    checkmarks: BattleGoalCheckmark[];
}

interface BattleGoalCheckmark {
    id: number;
    value: boolean;
}

interface GainedEnhancement {
    abilityCard: AbilityCard;
    slot: number;
    enhancement: Enhancement;
}
