import { type Dispatch, type SetStateAction } from "react";
import { FormGroup, Box, FormControlLabel, Switch, Typography, Grid } from "@mui/material";
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
            <Grid container>
                {settings.gameData.unlockableCharacterClasses.map((summary: UnlockableCharacterClassSummary) => (
                    <Grid key={summary.id} item xs={12} sm={6}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={characterClassIsUnlocked(summary, settings)}
                                    onChange={() => {
                                        handleChange(summary);
                                    }}
                                />
                            }
                            label={
                                <Box display="flex" justifyContent="center">
                                    <Image
                                        webpPath={summary.imageUrl}
                                        fallbackImageType="png"
                                        altText={`${summary.spoilerSafeName} Class Icon`}
                                        style={{ verticalAlign: "middle", marginRight: 10 }}
                                        height={30}
                                        width={30}
                                        aria-hidden="true"
                                    />
                                    <Typography width={120} overflow="hidden" textOverflow="ellipsis">
                                        {summary.spoilerSafeName}
                                    </Typography>
                                </Box>
                            }
                        />
                    </Grid>
                ))}
            </Grid>
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
export { toggleCharacterClass };
