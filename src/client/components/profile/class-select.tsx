import type { Dispatch, SetStateAction } from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField, type SelectChangeEvent } from "@mui/material";
import Image from "@/client/components/core/image";
import { useSettingsContext } from "@/client/hooks/use-settings";
import {
    useCharacterClassSummaries,
    type UseCharacterClassSummaries,
} from "@/client/hooks/data/use-character-class-summaries";
import { charactersAreCompletelySpoiled } from "@/client/services/spoiler";
import { requestCharacterClass } from "@/client/services/request";

interface ClassSelectProperties {
    readonly character: Character;
    readonly setCharacter: Dispatch<SetStateAction<Character>>;
}

const ClassSelect = ({ character, setCharacter }: ClassSelectProperties) => {
    const [settings, setSettings] = useSettingsContext();
    const { characterClassSummaries, isLoading, isError }: UseCharacterClassSummaries =
        useCharacterClassSummaries(settings);

    const handleChange = async (event: SelectChangeEvent) => {
        await findAndSetCharacterClass(
            event.target.value,
            characterClassSummaries ?? [],
            character,
            setCharacter,
            settings,
        );
        resetAbilityCardsTabConfig(settings, setSettings);
    };

    return (
        <FormControl sx={{ margin: "1%", width: "98%" }}>
            {isError ? (
                <TextField disabled label="Class" value="Failed to load classes" />
            ) : (
                <>
                    <InputLabel id="select-class-label">Class</InputLabel>
                    {isLoading ? (
                        <Select
                            value={character.characterClass.name}
                            label="Class"
                            labelId="select-class-label"
                            onChange={handleChange}
                        >
                            <MenuItem value={character.characterClass.name}>
                                <Image
                                    webpPath={character.characterClass.imageUrl}
                                    fallbackImageType="png"
                                    altText={`${character.characterClass.name} Class Icon`}
                                    style={{ verticalAlign: "middle", marginRight: 10, flexShrink: 0 }}
                                    height={30}
                                    width={30}
                                    aria-hidden="true"
                                />
                                {character.characterClass.name}
                            </MenuItem>
                            <MenuItem key="loading-message" disabled value="Loading">
                                Loading...
                            </MenuItem>
                        </Select>
                    ) : (
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
                            {!charactersAreCompletelySpoiled(settings) && (
                                <MenuItem key="spoiler-hint" disabled value="Spoiler hint">
                                    Change your spoiler settings to see more classes...
                                </MenuItem>
                            )}
                        </Select>
                    )}
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
    settings: Settings,
    // eslint-disable-next-line max-params
) => {
    const selectedCharacterClassSummary: CharacterClassSummary | undefined = characterClasses.find(
        (characterClass: CharacterClassSummary) => {
            return characterClass.name === characterClassName;
        },
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
    setSettings({ ...settings, userSettings: { ...settings.userSettings, selectedAbilityCardsTabIndex: 0 } });
};

export default ClassSelect;
export { findAndSetCharacterClass, resetAbilityCardsTabConfig };
