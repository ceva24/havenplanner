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

interface AbilityCard extends Asset {
    level: string;
    enhancementSlots: string[];
}

interface Enhancement extends Asset {
    validSlotTypes: string[];
}

interface Perk {
    description: string;
    count: number;
    add: AttackModifierCard[];
    remove: AttackModifierCard[];
}

interface AttackModifierCard extends Asset {}

interface Item extends Asset {
    slot: string;
}
