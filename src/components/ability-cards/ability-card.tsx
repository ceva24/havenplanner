import Image from "@/components/core/image";
import { createSafeRelativePath } from "@/utils";

const enhancedAbilityCardsBaseImageUrl = "https://raw.githubusercontent.com/ceva24/worldhaven-enhanced-cards/main";

interface AbilityCardProps {
    abilityCard: AbilityCard;
    character: Character;
}

const AbilityCard = ({ abilityCard, character }: AbilityCardProps) => {
    return (
        <Image
            webpPath={determineAbilityCardImageUrl(abilityCard, character)}
            fallbackImageType="jpg"
            altText={abilityCard.name}
            width={240}
            height={320}
            style={{ maxWidth: "100%", borderRadius: "3%" }}
        />
    );
};

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

    abilityCard.enhancementSlots.forEach((enhancementSlot: string, index: number) => {
        const gainedEnhancement: GainedEnhancement | undefined = character.gainedEnhancements.find(
            (enhc: GainedEnhancement) => enhc.slot === index && enhc.abilityCard.id === abilityCard.id
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

export default AbilityCard;
export { enhancedAbilityCardsBaseImageUrl, determineAbilityCardImageUrl, convertEnhancementNameToKey };
