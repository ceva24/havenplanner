import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { FormControlLabel, Checkbox, Box } from "@mui/material";
import PerkDescription from "@/components/perks/perk-description";
import { characterHasGainedPerk, findCharacterGainedPerk } from "@/services/character";

interface PerkListProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const PerkList = ({ character, setCharacter }: PerkListProps) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>, perk: Perk, checkboxIndex: number) => {
        if (event.target.checked) {
            gainPerk(perk, checkboxIndex, character, setCharacter);
        } else {
            removePerk(perk, checkboxIndex, character, setCharacter);
        }
    };

    return (
        <Box component="section" aria-label="Perk List">
            {character.characterClass.perks.map((perk: Perk) => (
                <Box key={perk.description}>
                    <FormControlLabel
                        control={
                            <>
                                {Array.from({ length: perk.count }).map((item, checkboxIndex) => {
                                    const label =
                                        checkboxIndex > 0
                                            ? `${perk.description} ${checkboxIndex + 1}`
                                            : perk.description;

                                    return (
                                        <Checkbox
                                            // eslint-disable-next-line react/no-array-index-key
                                            key={checkboxIndex}
                                            checked={characterHasGainedPerk(character, perk, checkboxIndex)}
                                            inputProps={{ "aria-label": label }}
                                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                handleChange(event, perk, checkboxIndex);
                                            }}
                                        />
                                    );
                                })}
                            </>
                        }
                        label={<PerkDescription perk={perk} />}
                    />
                </Box>
            ))}
        </Box>
    );
};

const gainPerk = (
    perk: Perk,
    checkboxIndex: number,
    character: Character,
    setCharacter: Dispatch<SetStateAction<Character>>
) => {
    const gainedPerk: GainedPerk = {
        perk,
        checkboxIndex,
    };

    setCharacter({
        ...character,
        gainedPerks: character.gainedPerks.concat([gainedPerk]),
    });
};

const removePerk = (
    perk: Perk,
    checkboxIndex: number,
    character: Character,
    setCharacter: Dispatch<SetStateAction<Character>>
) => {
    const gainedPerk = findCharacterGainedPerk(character, perk, checkboxIndex);

    if (!gainedPerk) return;

    const newGainedPerks = character.gainedPerks.filter(
        (perk: GainedPerk, index: number) => index !== character.gainedPerks.indexOf(gainedPerk)
    );

    setCharacter({
        ...character,
        gainedPerks: newGainedPerks,
    });
};

export default PerkList;
export { gainPerk, removePerk };
