interface AppSettings {
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

interface GainedEnhancement {
    abilityCard: AbilityCard;
    enhancementSlot: EnhancementSlot;
    enhancement: Enhancement;
}

interface GainedPerk {
    perk: Perk;
    checkboxIndex: number;
}

interface AttackModifierDeckCard {
    card: AttackModifierCard;
    count: number;
}

interface BattleGoalCheckmarkGroup {
    id: number;
    checkmarks: BattleGoalCheckmark[];
}

interface BattleGoalCheckmark {
    id: number;
    value: boolean;
}

interface CharacterItem {
    id: string;
    item: Item;
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
    e: Array<[number, number, number]>; // Gained enhancement ability card id, slot id and enhancement id
    p: Array<[number, number]>; // Gained perk and checkbox indices
    b: boolean[][]; // Gained battle goal checkmark groups
}
