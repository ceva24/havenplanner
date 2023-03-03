import { type Dispatch, type SetStateAction } from "react";
import { FormControlLabel, Checkbox, Box, FormGroup } from "@mui/material";
import { useSettingsContext } from "@/hooks/use-settings";
import { itemGroupIsActive } from "@/services/settings";

const ItemGroups = () => {
    const [settings, setSettings] = useSettingsContext();

    const handleChange = (itemGroup: ItemGroup) => {
        toggleItemGroup(itemGroup, settings, setSettings);
    };

    return (
        <FormGroup>
            <Box display="flex" flexWrap="wrap">
                {settings.gameSettings.itemGroups.map((itemGroup: ItemGroup) => (
                    <FormControlLabel
                        key={itemGroup.id}
                        control={
                            <Checkbox
                                checked={itemGroupIsActive(itemGroup, settings)}
                                onChange={() => {
                                    handleChange(itemGroup);
                                }}
                            />
                        }
                        label={itemGroup.name}
                    />
                ))}
            </Box>
        </FormGroup>
    );
};

const toggleItemGroup = (itemGroup: ItemGroup, settings: Settings, setSettings: Dispatch<SetStateAction<Settings>>) => {
    const itemGroups = itemGroupIsActive(itemGroup, settings)
        ? settings.spoilerSettings.items.itemGroups.filter((group: ItemGroup) => !(group.id === itemGroup.id))
        : settings.spoilerSettings.items.itemGroups.concat(itemGroup);

    const newSettings: Settings = { ...settings };

    newSettings.spoilerSettings.items.itemGroups = itemGroups;

    setSettings(newSettings);
};

export default ItemGroups;

export { toggleItemGroup };
