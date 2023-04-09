import type { Dispatch, FC, SetStateAction } from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField, type SelectChangeEvent } from "@mui/material";
import Image from "@/client/components/core/image";
import { useSettingsContext } from "@/client/hooks/use-settings";
import {
    useCharacterClassSummaries,
    type UseCharacterClassSummaries,
} from "@/client/hooks/data/use-character-class-summaries";
import { areCharactersCompletelySpoiled } from "@/client/services/spoiler";
import { requestCharacterClass } from "@/client/services/request";

interface ClassSelectProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const ClassSelect: FC<ClassSelectProps> = ({ character, setCharacter }: ClassSelectProps) => {
    const [settings, setSettings] = useSettingsContext();
    const { characterClassSummaries, isLoading, isError }: UseCharacterClassSummaries =
        useCharacterClassSummaries(settings);

    const handleChange = async (event: SelectChangeEvent) => {
        await findAndSetCharacterClass(
            event.target.value,
            characterClassSummaries ?? [],
            character,
            setCharacter,
            settings
        );
        resetAbilityCardsTabConfig(settings, setSettings);
    };

    return (
        <FormControl sx={{ margin: "1%", width: "98%" }}>
            {isError ? (
                <TextField disabled label="Class" value="Failed to load classes" />
            ) : isLoading ? (
                <TextField disabled label="Class" value="Loading..." />
            ) : (
                <>
                    <InputLabel id="select-class-label">Class</InputLabel>
                    <Select
                        value={character.characterClass.name}
                        label="Class"
                        labelId="select-class-label"
                        onChange={handleChange}
                    >
                        {(characterClassSummaries ?? []).map((characterClass: CharacterClassSummary) => (
                            <MenuItem key={characterClass.id} value={characterClass.name}>
                                <Image
                                    webpPath={characterClass.imageUrl}
                                    fallbackImageType="png"
                                    altText={`${characterClass.name} Class Icon`}
                                    style={{ verticalAlign: "middle", marginRight: 10, flexShrink: 0 }}
                                    height={30}
                                    width={30}
                                    aria-hidden="true"
                                />
                                {characterClass.name}
                            </MenuItem>
                        ))}
                        {!areCharactersCompletelySpoiled(settings) && (
                            <MenuItem key="spoiler-hint" disabled value="Spoiler hint">
                                Change your spoiler settings to see more classes...
                            </MenuItem>
                        )}
                    </Select>
                </>
            )}
        </FormControl>
    );
};

const findAndSetCharacterClass = async (
    characterClassName: string,
    characterClasses: CharacterClassSummary[],
    character: Character,
    setCharacter: Dispatch<SetStateAction<Character>>,
    settings: Settings
    // eslint-disable-next-line max-params
) => {
    const selectedCharacterClassSummary: CharacterClassSummary | undefined = characterClasses.find(
        (characterClass: CharacterClassSummary) => {
            return characterClass.name === characterClassName;
        }
    );

    const characterClass = selectedCharacterClassSummary
        ? await requestCharacterClass(settings.gameData.game.id, selectedCharacterClassSummary.id)
        : settings.gameData.defaultCharacter.characterClass;

    setCharacter({
        ...character,
        characterClass,
        unlockedAbilityCards: [],
        hand: [],
        gainedEnhancements: [],
        gainedPerks: [],
        battleGoalCheckmarkGroups: settings.gameData.battleGoalCheckmarks.slice(),
    });
};

const resetAbilityCardsTabConfig = (settings: Settings, setSettings: Dispatch<SetStateAction<Settings>>) => {
    setSettings({ ...settings, selectedAbilityCardsTabIndex: 0 });
};

export default ClassSelect;
export { findAndSetCharacterClass, resetAbilityCardsTabConfig };
