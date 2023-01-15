/* eslint-disable @typescript-eslint/ban-types */
import type { Dispatch, HTMLAttributes, SetStateAction, SyntheticEvent } from "react";
import { Autocomplete, type AutocompleteRenderInputParams, Box } from "@mui/material";
import Image from "@/components/core/image";
import EnhancementsAutocompleteInput from "@/components/ability-cards/enhancements/enhancements-autocomplete-input";
import { enhancements } from "@/loaders/enhancements";

interface EnhancementsAutocompleteProps {
    slotType: string;
    abilityCard: AbilityCard;
    slot: number;
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const EnhancementsAutocomplete = ({
    slotType,
    abilityCard,
    slot,
    character,
    setCharacter,
}: EnhancementsAutocompleteProps) => {
    const handleChange = (event: SyntheticEvent, value: Enhancement | null) => {
        gainOrRemoveEnhancement(value, abilityCard, slot, character, setCharacter);
    };

    return (
        <Autocomplete
            disablePortal
            value={getEnhancementSlotValue(character, abilityCard, slot)}
            options={getPossibleEnhancementsFor(slotType)}
            getOptionLabel={(enhancement: Enhancement) => enhancement.name}
            renderOption={(props: HTMLAttributes<HTMLLIElement>, enhancement: Enhancement) => (
                <Box component="li" sx={{ "& > picture": { marginRight: 2, flexShrink: 0 } }} {...props}>
                    <Image
                        webpPath={enhancement.imageUrl}
                        fallbackImageType="png"
                        altText={enhancement.name}
                        style={{ verticalAlign: "middle" }}
                        aria-hidden="true"
                    />
                    {enhancement.name}
                </Box>
            )}
            renderInput={(props: AutocompleteRenderInputParams) => (
                <EnhancementsAutocompleteInput {...props} slotType={slotType} />
            )}
            onChange={handleChange}
        />
    );
};

const getEnhancementSlotValue = (character: Character, abilityCard: AbilityCard, slot: number): Enhancement | null => {
    const gainedEnhancement: GainedEnhancement | undefined = character.gainedEnhancements.find(
        (gainedEnhancement: GainedEnhancement) =>
            gainedEnhancement.abilityCard.id === abilityCard.id && gainedEnhancement.slot === slot
    );

    return gainedEnhancement?.enhancement ?? null;
};

const getPossibleEnhancementsFor = (slotType: string): Enhancement[] => {
    return enhancements.filter((enhancement: Enhancement) => enhancement.validSlotTypes.includes(slotType));
};

const gainOrRemoveEnhancement = (
    enhancement: Enhancement | null,
    abilityCard: AbilityCard,
    slot: number,
    character: Character,
    setCharacter: Dispatch<SetStateAction<Character>>
    // eslint-disable-next-line max-params
) => {
    let gainedEnhancements: GainedEnhancement[] = character.gainedEnhancements.filter(
        (gainedEnhancement: GainedEnhancement) =>
            gainedEnhancement.abilityCard.id !== abilityCard.id || gainedEnhancement.slot !== slot
    );

    if (enhancement) {
        gainedEnhancements = gainedEnhancements.concat([
            {
                abilityCard,
                slot,
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
