import { type Dispatch, type SetStateAction } from "react";
import { FormGroup, Box, FormControlLabel, Switch } from "@mui/material";
import Image from "@/components/core/image";
import { useSettingsContext } from "@/hooks/use-settings";
import { characterClassIsUnlocked } from "@/services/spoiler";

const CharacterClasses = () => {
    const [settings, setSettings] = useSettingsContext();

    const handleChange = (unlockableCharacterClassSummary: UnlockableCharacterClassSummary) => {
        toggleCharacterClass(unlockableCharacterClassSummary, settings, setSettings);
    };

    return (
        <FormGroup>
            <Box display="flex" flexWrap="wrap" justifyContent="center" rowGap={3}>
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
                            label={
                                <Image
                                    webpPath={unlockableCharacterClassSummary.imageUrl}
                                    fallbackImageType="png"
                                    altText={`${unlockableCharacterClassSummary.spoilerSafeName} Class Icon`}
                                    style={{ verticalAlign: "middle", marginRight: 10, flexShrink: 0 }}
                                    height={45}
                                    width={45}
                                    aria-hidden="true"
                                />
                            }
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
