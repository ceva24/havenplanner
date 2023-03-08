import { type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import { FormControlLabel, Switch } from "@mui/material";
import { removeSpoilerItems } from "@/components/header/settings-button";
import { useSettingsContext } from "@/hooks/use-settings";
import { isCompletelySpoiled } from "@/services/spoiler";

interface SpoilAllSwitchProps {
    shouldApplyImmediately?: boolean;
    character?: Character;
    setCharacter?: Dispatch<SetStateAction<Character>>;
}

const SpoilAllSwitch = ({ shouldApplyImmediately, character, setCharacter }: SpoilAllSwitchProps) => {
    const [settings, setSettings] = useSettingsContext();

    const handleChange = (event: ChangeEvent<HTMLInputElement>, shouldSpoilAll: boolean) => {
        if (shouldSpoilAll) {
            spoilAll(settings, setSettings);
        } else {
            unspoilAll(settings, setSettings, shouldApplyImmediately, character, setCharacter);
        }
    };

    return (
        <FormControlLabel
            control={<Switch checked={isCompletelySpoiled(settings)} onChange={handleChange} />}
            label="Spoil all"
        />
    );
};

const spoilAll = (settings: Settings, setSettings: Dispatch<SetStateAction<Settings>>) => {
    const spoilerSettings: SpoilerSettings = {
        items: {
            prosperity: 9,
            itemGroups: settings.gameData.itemGroups.slice(),
        },
    };

    setSettings({ ...settings, spoilerSettings });
};

const unspoilAll = (
    settings: Settings,
    setSettings: Dispatch<SetStateAction<Settings>>,
    shouldApplyImmediately?: boolean,
    character?: Character,
    setCharacter?: Dispatch<SetStateAction<Character>>
) => {
    const spoilerSettings: SpoilerSettings = {
        items: {
            prosperity: 1,
            itemGroups: [],
        },
    };

    setSettings({ ...settings, spoilerSettings });

    if (shouldApplyImmediately && character && setCharacter)
        removeSpoilerItems(character, setCharacter, spoilerSettings);
};

export default SpoilAllSwitch;
