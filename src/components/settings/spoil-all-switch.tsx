import { type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import { FormControlLabel, Switch } from "@mui/material";
import { updateCharacterAfterChangingSpoilerSettings } from "@/components/settings/settings-button";
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
        classes: settings.gameData.unlockableCharacterClasses.slice(),
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
    // eslint-disable-next-line max-params
) => {
    const spoilerSettings: SpoilerSettings = {
        classes: [],
        items: {
            prosperity: 1,
            itemGroups: [],
        },
    };

    const newSettings: Settings = { ...settings, spoilerSettings };

    setSettings(newSettings);

    if (shouldApplyImmediately && character && setCharacter)
        updateCharacterAfterChangingSpoilerSettings(character, setCharacter, newSettings);
};

export default SpoilAllSwitch;
export { spoilAll, unspoilAll };
