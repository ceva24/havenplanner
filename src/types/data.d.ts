interface Asset {
    id: number;
    name: string;
}

interface VisualAsset extends Asset {
    imageUrl: string;
}

interface Game extends Asset {}

interface CharacterClass extends VisualAsset {
    characterMatFrontImageUrl: string;
    characterMatBackImageUrl: string;
    cardBackImageUrl: string;
    initiallyLocked: boolean;
    spoilerSafeName: string;
    handSize: number;
    abilityCards: AbilityCard[];
    perks: Perk[];
}

interface PersonalQuest extends VisualAsset {}

interface AbilityCard extends VisualAsset {
    level: string;
    enhancementSlots: EnhancementSlot[];
}

interface EnhancementSlot extends Asset {
    types: string[];
}

interface Enhancement extends VisualAsset {
    validSlotTypes: string[];
}

interface Perk extends Asset {
    count: number;
    add: AttackModifierCard[];
    remove: AttackModifierCard[];
}

interface AttackModifierCard extends VisualAsset {}

interface Item extends VisualAsset {
    slot: string;
    group: string;
    alternativeImageUrl?: string;
    remove?: AttackModifierCard[];
}

interface ItemGroup extends Asset {}

interface ItemSlot extends VisualAsset {}
