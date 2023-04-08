import { FormControl, FormControlLabel, Switch } from "@mui/material";
import { useSettingsContext } from "@/client/hooks/use-settings";

const PersonalQuestSwitch = () => {
    const [settings, setSettings] = useSettingsContext();

    const handleChange = () => {
        setSettings({ ...settings, showPersonalQuest: !settings.showPersonalQuest });
    };

    return (
        <FormControl>
            <FormControlLabel
                control={
                    <Switch
                        id="show-personal-quest-switch"
                        name="Show personal quest"
                        checked={settings.showPersonalQuest}
                        onClick={handleChange}
                    />
                }
                label="Show personal quest"
            />
        </FormControl>
    );
};

export default PersonalQuestSwitch;
