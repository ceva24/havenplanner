import type { Dispatch, SetStateAction } from "react";
import { Select, MenuItem, type SelectChangeEvent, InputLabel, FormControl } from "@mui/material";
import Image from "@/components/core/image";
import { enhancements } from "@/loaders/enhancements";
import { getPossibleEnhancementsFor } from "@/services/ability-cards/enhancement";

interface EnhancementsSelectProps {
    abilityCard: AbilityCard;
    enhancementSlot: EnhancementSlot;
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const EnhancementsSelect = ({ abilityCard, enhancementSlot, character, setCharacter }: EnhancementsSelectProps) => {
    const handleChange = (event: SelectChangeEvent<number>) => {
        gainOrRemoveEnhancement(event.target.value, abilityCard, enhancementSlot, character, setCharacter);
    };

    const labelId = `${abilityCard.id}-${enhancementSlot.id}-label`;

    return (
        <FormControl fullWidth>
            <InputLabel id={labelId}>{enhancementSlot.name}</InputLabel>
            <Select
                labelId={labelId}
                value={getEnhancementSlotValue(character, abilityCard, enhancementSlot)}
                label={enhancementSlot.name}
                onChange={handleChange}
            >
                <MenuItem value="">None</MenuItem>
                {getPossibleEnhancementsFor(enhancementSlot).map((enhancement: Enhancement) => {
                    return (
                        <MenuItem key={enhancement.id} value={enhancement.id}>
                            <Image
                                webpPath={enhancement.imageUrl}
                                fallbackImageType="png"
                                altText={enhancement.name}
                                style={{ verticalAlign: "middle", marginRight: 10, flexShrink: 0 }}
                                height={30}
                                width={30}
                                aria-hidden="true"
                            />
                            {enhancement.name}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

const getEnhancementSlotValue = (
    character: Character,
    abilityCard: AbilityCard,
    enhancementSlot: EnhancementSlot
): number | "" => {
    const gainedEnhancement: GainedEnhancement | undefined = character.gainedEnhancements.find(
        (gainedEnhancement: GainedEnhancement) =>
            gainedEnhancement.abilityCard.id === abilityCard.id &&
            gainedEnhancement.enhancementSlot.id === enhancementSlot.id
    );

    return gainedEnhancement?.enhancement?.id ?? "";
};

const gainOrRemoveEnhancement = (
    enhancementId: string | number,
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

    const enhancement: Enhancement | undefined = enhancements.find((enhancement) => enhancement.id === enhancementId);

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

export default EnhancementsSelect;
export { getEnhancementSlotValue, gainOrRemoveEnhancement };
