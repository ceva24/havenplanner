/* eslint-disable @typescript-eslint/ban-types */
import { type Dispatch, type HTMLAttributes, type SetStateAction, type SyntheticEvent } from "react";
import { Autocomplete, type AutocompleteRenderInputParams, Box, TextField } from "@mui/material";
import { enhancements } from "@/loaders/enhancements";
import Image from "@/components/core/image";

interface EnhancementAutocompleteProps {
    slotType: string;
    abilityCard: AbilityCard;
    slot: number;
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const EnhancementAutocomplete = ({
    slotType,
    abilityCard,
    slot,
    character,
    setCharacter,
}: EnhancementAutocompleteProps) => {
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
                <Box component="li" sx={{ "& > picture": { mr: 2, flexShrink: 0 } }} {...props}>
                    <Image
                        webpPath={enhancement.imageUrl}
                        fallbackImageType="png"
                        altText={enhancement.name}
                        style={{ verticalAlign: "middle" }}
                    />
                    {enhancement.name}
                </Box>
            )}
            renderInput={(props: AutocompleteRenderInputParams) => {
                return (
                    <TextField
                        {...props}
                        label={`${props.inputProps.value ? "" : "Empty spot - "}${getLabelFor(slotType)}`}
                    />
                );
            }}
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

// eslint-disable-next-line complexity
const getLabelFor = (enhancementSlot: string) => {
    switch (enhancementSlot) {
        case "move": {
            return "Move";
        }

        case "attack": {
            return "Attack";
        }

        case "range": {
            return "Range";
        }

        case "shield": {
            return "Shield";
        }

        case "push": {
            return "PUSH";
        }

        case "pull": {
            return "PULL";
        }

        case "pierce": {
            return "PIERCE";
        }

        case "retaliate": {
            return "Retaliate";
        }

        case "heal": {
            return "Heal";
        }

        case "target": {
            return "ADD TARGET";
        }

        case "summon": {
            return "Summon";
        }

        case "poison": {
            return "POISON";
        }

        case "wound": {
            return "WOUND";
        }

        case "immobilize": {
            return "IMMOBILIZE";
        }

        case "disarm": {
            return "DISARM";
        }

        case "curse": {
            return "CURSE";
        }

        case "stun": {
            return "STUN";
        }

        case "strengthen": {
            return "STRENGTHEN";
        }

        case "bless": {
            return "BLESS";
        }

        case "invisible": {
            return "INVISIBLE";
        }

        case "area": {
            return "area attack";
        }

        default: {
            return enhancementSlot;
        }
    }
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

export default EnhancementAutocomplete;
