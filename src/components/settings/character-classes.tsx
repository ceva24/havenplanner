import { type Dispatch, type SetStateAction } from "react";
import { FormGroup, Box, FormControlLabel, Switch } from "@mui/material";
import { useSettingsContext } from "@/hooks/use-settings";
import { characterClassIsUnlocked } from "@/services/spoiler";

const CharacterClasses = () => {
    const [settings, setSettings] = useSettingsContext();

    const handleChange = (unlockableCharacterClassSummary: UnlockableCharacterClassSummary) => {
        toggleCharacterClass(unlockableCharacterClassSummary, settings, setSettings);
    };

    return (
        <FormGroup>
            <Box display="flex" flexWrap="wrap">
                {settings.gameData.unlockableCharacterClasses.map(
                    (unlockableCharacterClassSummary: UnlockableCharacterClassSummary) => (
                        <FormControlLabel
                            key={unlockableCharacterClassSummary.id}
                            control={
                                <Switch
                                    checked={characterClassIsUnlocked(unlockableCharacterClassSummary, settings)}
                                    onChange={() => {
                                        handleChange(unlockableCharacterClassSummary);
                                    }}
                                />
                            }
                            label={unlockableCharacterClassSummary.id}
                        />
                    )
                )}
            </Box>
        </FormGroup>
    );
};

const toggleCharacterClass = (
    unlockableCharacterClassSummary: UnlockableCharacterClassSummary,
    settings: Settings,
    setSettings: Dispatch<SetStateAction<Settings>>
) => {
    const classes = characterClassIsUnlocked(unlockableCharacterClassSummary, settings)
        ? settings.spoilerSettings.classes.filter(
              (characterClass: UnlockableCharacterClassSummary) =>
                  !(characterClass.id === unlockableCharacterClassSummary.id)
          )
        : settings.spoilerSettings.classes.concat(unlockableCharacterClassSummary);

    const newSettings: Settings = { ...settings };

    newSettings.spoilerSettings.classes = classes;

    setSettings(newSettings);
};

export default CharacterClasses;
