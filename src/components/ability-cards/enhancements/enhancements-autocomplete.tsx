/* eslint-disable @typescript-eslint/ban-types */
import type { Dispatch, HTMLAttributes, SetStateAction, SyntheticEvent } from "react";
import { Autocomplete, type AutocompleteRenderInputParams, Box } from "@mui/material";
import Image from "@/components/core/image";
import EnhancementsAutocompleteInput from "@/components/ability-cards/enhancements/enhancements-autocomplete-input";
import { enhancements } from "@/loaders/enhancements";

interface EnhancementsAutocompleteProps {
    abilityCard: AbilityCard;
    enhancementSlot: EnhancementSlot;
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const EnhancementsAutocomplete = ({
    abilityCard,
    enhancementSlot,
    character,
    setCharacter,
}: EnhancementsAutocompleteProps) => {
    const handleChange = (event: SyntheticEvent, value: Enhancement | null) => {
        gainOrRemoveEnhancement(value, abilityCard, enhancementSlot, character, setCharacter);
    };

    return (
        <Autocomplete
            disablePortal
            value={getEnhancementSlotValue(character, abilityCard, enhancementSlot)}
            options={getPossibleEnhancementsFor(enhancementSlot)}
            getOptionLabel={(enhancement: Enhancement) => enhancement.name}
            renderOption={(props: HTMLAttributes<HTMLLIElement>, enhancement: Enhancement) => (
                <Box component="li" sx={{ "& > picture": { marginRight: 2, flexShrink: 0 } }} {...props}>
                    <Image
                        webpPath={enhancement.imageUrl}
                        fallbackImageType="png"
                        altText={enhancement.name}
                        style={{ verticalAlign: "middle" }}
                        height={30}
                        width={30}
                        aria-hidden="true"
                    />
                    {enhancement.name}
                </Box>
            )}
            renderInput={(props: AutocompleteRenderInputParams) => (
                <EnhancementsAutocompleteInput {...props} enhancementSlot={enhancementSlot} />
            )}
            onChange={handleChange}
        />
    );
};

const getEnhancementSlotValue = (
    character: Character,
    abilityCard: AbilityCard,
    enhancementSlot: EnhancementSlot
): Enhancement | null => {
    const gainedEnhancement: GainedEnhancement | undefined = character.gainedEnhancements.find(
        (gainedEnhancement: GainedEnhancement) =>
            gainedEnhancement.abilityCard.id === abilityCard.id &&
            gainedEnhancement.enhancementSlot.id === enhancementSlot.id
    );

    return gainedEnhancement?.enhancement ?? null;
};

const getPossibleEnhancementsFor = (enhancementSlot: EnhancementSlot): Enhancement[] => {
    return enhancements.filter((enhancement: Enhancement) =>
        enhancement.validSlotTypes.some((slotType: string) => enhancementSlot.types.includes(slotType))
    );
};

const gainOrRemoveEnhancement = (
    enhancement: Enhancement | null,
    abilityCard: AbilityCard,
    enhancementSlot: EnhancementSlot,
    character: Character,
    setCharacter: Dispatch<SetStateAction<Character>>
    // eslint-disable-next-line max-params
) => {
    let gainedEnhancements: GainedEnhancement[] = character.gainedEnhancements.filter(
        (gainedEnhancement: GainedEnhancement) =>
            gainedEnhancement.abilityCard.id !== abilityCard.id ||
            gainedEnhancement.enhancementSlot.id !== enhancementSlot.id
    );

    if (enhancement) {
        gainedEnhancements = gainedEnhancements.concat([
            {
                abilityCard,
                enhancementSlot,
                enhancement,
            },
        ]);
    }

    setCharacter({
        ...character,
        gainedEnhancements,
    });
};

export default EnhancementsAutocomplete;
export { getEnhancementSlotValue, getPossibleEnhancementsFor, gainOrRemoveEnhancement };
