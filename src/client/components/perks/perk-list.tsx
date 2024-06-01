import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Checkbox, Box } from "@mui/material";
import PerkLabel from "@/client/components/perks/perk-label";
import { characterHasGainedPerk, findCharacterGainedPerk } from "@/client/services/perks/perk";

interface PerkListProperties {
    readonly character: Character;
    readonly setCharacter: Dispatch<SetStateAction<Character>>;
}

const PerkList = ({ character, setCharacter }: PerkListProperties) => {
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
                    <Box key={perk.name}>
                        {Array.from({ length: perk.count }).map((item: unknown, checkboxIndex: number) => {
                            const styleProperties =
                                checkboxIndex === 0
                                    ? { "aria-labelledby": perkLabelId }
                                    : { "aria-label": `${perk.name} ${checkboxIndex + 1}` };

                            return (
                                <Checkbox
                                    // eslint-disable-next-line react/no-array-index-key
                                    key={checkboxIndex}
                                    checked={characterHasGainedPerk(character, perk, checkboxIndex)}
                                    inputProps={styleProperties}
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
    setCharacter: Dispatch<SetStateAction<Character>>,
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
    setCharacter: Dispatch<SetStateAction<Character>>,
) => {
    const gainedPerk = findCharacterGainedPerk(character, perk, checkboxIndex);

    if (!gainedPerk) return;

    const newGainedPerks = character.gainedPerks.filter(
        (perk: GainedPerk) => perk.perk.id !== gainedPerk.perk.id || perk.checkboxIndex !== gainedPerk.checkboxIndex,
    );

    setCharacter({
        ...character,
        gainedPerks: newGainedPerks,
    });
};

export default PerkList;
export { gainPerk, removePerk };
