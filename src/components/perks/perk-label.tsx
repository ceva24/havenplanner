import { type Dispatch, type SetStateAction } from "react";
import { FormLabel } from "@mui/material";
import RichPerkDescription from "@/components/perks/rich-perk-description";
import { characterHasGainedPerk } from "@/services/perks/perk";
import { gainPerk } from "@/components/perks/perk-list";

interface PerkLabelProps {
    perk: Perk;
    labelId: string;
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const PerkLabel = ({ perk, labelId, character, setCharacter }: PerkLabelProps) => {
    const handleLabelClick = (perk: Perk) => {
        const gainedPerks = character.gainedPerks.filter((gainedPerk: GainedPerk) => gainedPerk.perk.id === perk.id);

        if (gainedPerks.length === perk.count) {
            removeGainedPerksForPerk(perk, character, setCharacter);
        } else {
            const indexOfFirstUngainedPerkCheckbox = Array.from(Array.from({ length: perk.count }).keys()).find(
                (index: number) => !characterHasGainedPerk(character, perk, index)
            );

            if (typeof indexOfFirstUngainedPerkCheckbox !== "undefined")
                gainPerk(perk, indexOfFirstUngainedPerkCheckbox, character, setCharacter);
        }
    };

    return (
        <FormLabel
            id={labelId}
            sx={{ cursor: "pointer" }}
            aria-label={perk.name}
            onClick={() => {
                handleLabelClick(perk);
            }}
        >
            <RichPerkDescription perk={perk} />
        </FormLabel>
    );
};

const removeGainedPerksForPerk = (
    perk: Perk,
    character: Character,
    setCharacter: Dispatch<SetStateAction<Character>>
) => {
    const newGainedPerks = character.gainedPerks.filter((gainedPerk: GainedPerk) => gainedPerk.perk.id !== perk.id);

    setCharacter({
        ...character,
        gainedPerks: newGainedPerks,
    });
};

export default PerkLabel;
export { removeGainedPerksForPerk };
