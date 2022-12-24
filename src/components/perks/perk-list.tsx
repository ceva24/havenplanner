import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Checkbox, Box } from "@mui/material";
import PerkLabel from "@/components/perks/perk-label";
import { characterHasGainedPerk, findCharacterGainedPerk } from "@/services/character";

interface PerkListProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const PerkList = ({ character, setCharacter }: PerkListProps) => {
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, perk: Perk, checkboxIndex: number) => {
        if (event.target.checked) {
            gainPerk(perk, checkboxIndex, character, setCharacter);
        } else {
            removePerk(perk, checkboxIndex, character, setCharacter);
        }
    };

    return (
        <Box component="section" aria-label="Perk List">
            {character.characterClass.perks.map((perk: Perk, perkIndex: number) => {
                const perkLabelId = `perk-${perkIndex}-label`;

                return (
                    <Box key={perk.description}>
                        {Array.from({ length: perk.count }).map((item: unknown, checkboxIndex: number) => {
                            const styleProps =
                                checkboxIndex === 0
                                    ? { "aria-labelledby": perkLabelId }
                                    : { "aria-label": `${perk.description} ${checkboxIndex + 1}` };

                            return (
                                <Checkbox
                                    // eslint-disable-next-line react/no-array-index-key
                                    key={checkboxIndex}
                                    checked={characterHasGainedPerk(character, perk, checkboxIndex)}
                                    inputProps={styleProps}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                        handleCheckboxChange(event, perk, checkboxIndex);
                                    }}
                                />
                            );
                        })}
                        <PerkLabel
                            perk={perk}
                            labelId={perkLabelId}
                            character={character}
                            setCharacter={setCharacter}
                        />
                    </Box>
                );
            })}
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
