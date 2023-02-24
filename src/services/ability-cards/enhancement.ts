import { enhancements } from "@/loaders/enhancements";
import { createSafeRelativePath } from "@/services/core/image";

const enhancedAbilityCardsBaseImageUrl = "https://raw.githubusercontent.com/ceva24/worldhaven-enhanced-cards/main";

const determineAbilityCardImageUrl = (abilityCard: AbilityCard, character: Character): string => {
    return character.gainedEnhancements && abilityCardHasGainedEnhancements(abilityCard, character)
        ? createEnhancedAbilityCardImageUrl(abilityCard, character)
        : abilityCard.imageUrl;
};

const abilityCardHasGainedEnhancements = (abilityCard: AbilityCard, character: Character): boolean => {
    return character.gainedEnhancements.some(
        (gainedEnhancement: GainedEnhancement) => gainedEnhancement.abilityCard.id === abilityCard.id
    );
};

const createEnhancedAbilityCardImageUrl = (abilityCard: AbilityCard, character: Character): string => {
    return `${enhancedAbilityCardsBaseImageUrl}${createEnhancedAbilityCardPath(
        abilityCard
    )}${createEnhancedAbilityCardFilename(abilityCard, character)}`;
};

const createEnhancedAbilityCardPath = (abilityCard: AbilityCard) => {
    const path = abilityCard.imageUrl
        .slice(0, Math.max(0, abilityCard.imageUrl.lastIndexOf(".")))
        .replace("character-ability-cards/", "")
        .concat("/");

    return createSafeRelativePath(path);
};

const createEnhancedAbilityCardFilename = (abilityCard: AbilityCard, character: Character): string => {
    let filename = "";

    abilityCard.enhancementSlots.forEach((enhancementSlot: EnhancementSlot, index: number) => {
        const gainedEnhancement: GainedEnhancement | undefined = character.gainedEnhancements.find(
            (enhc: GainedEnhancement) =>
                enhc.enhancementSlot.id === enhancementSlot.id && enhc.abilityCard.id === abilityCard.id
        );

        filename = filename.concat("-").concat(createEnhancementName(gainedEnhancement));
    });

    return filename.slice(1).concat(".webp");
};

const createEnhancementName = (gainedEnhancement: GainedEnhancement | undefined) => {
    return gainedEnhancement ? convertEnhancementNameToKey(gainedEnhancement.enhancement.name) : "none";
};

const convertEnhancementNameToKey = (enhancementName: string) => {
    return enhancementName
        .replace("+1", "plus-one")
        .replace("Attack Hex", "hex")
        .replace("Any element", "any-element")
        .toLowerCase();
};

const getPossibleEnhancementsFor = (enhancementSlot: EnhancementSlot): Enhancement[] => {
    return enhancements.filter((enhancement: Enhancement) =>
        enhancement.validSlotTypes.some((slotType: string) => enhancementSlot.types.includes(slotType))
    );
};

export {
    enhancedAbilityCardsBaseImageUrl,
    determineAbilityCardImageUrl,
    convertEnhancementNameToKey,
    getPossibleEnhancementsFor,
};
