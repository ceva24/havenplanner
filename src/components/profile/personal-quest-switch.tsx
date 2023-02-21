import { FormControl, FormControlLabel, Switch } from "@mui/material";
import { useAppSettingsContext } from "@/hooks/use-app-settings";

const PersonalQuestSwitch = () => {
    const [appSettings, setAppSettings] = useAppSettingsContext();

    const handleChange = () => {
        setAppSettings({ ...appSettings, showPersonalQuest: !appSettings.showPersonalQuest });
    };

    return (
        <FormControl>
            <FormControlLabel
                control={
                    <Switch
                        id="show-personal-quest-switch"
                        name="Show personal quest"
                        checked={appSettings.showPersonalQuest}
                        onClick={handleChange}
                    />
                }
                label="Show personal quest"
            />
        </FormControl>
    );
};

export default PersonalQuestSwitch;
