import { type Dispatch, type SetStateAction } from "react";
import { FormControlLabel, Checkbox, Box, FormGroup } from "@mui/material";
import { itemGroups } from "@/loaders/item-groups";
import { useAppSettingsContext } from "@/hooks/use-app-settings";
import { itemGroupIsActive } from "@/services/settings";

const ItemGroups = () => {
    const [appSettings, setAppSettings] = useAppSettingsContext();

    const handleChange = (itemGroup: ItemGroup) => {
        toggleItemGroup(itemGroup, appSettings, setAppSettings);
    };

    return (
        <FormGroup>
            <Box display="flex" flexWrap="wrap">
                {itemGroups.map((itemGroup: ItemGroup) => (
                    <FormControlLabel
                        key={itemGroup.id}
                        control={
                            <Checkbox
                                checked={itemGroupIsActive(itemGroup, appSettings)}
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

const toggleItemGroup = (
    itemGroup: ItemGroup,
    appSettings: AppSettings,
    setAppSettings: Dispatch<SetStateAction<AppSettings>>
) => {
    const itemGroups = itemGroupIsActive(itemGroup, appSettings)
        ? appSettings.spoilerSettings.itemGroups.filter((group: ItemGroup) => !(group.id === itemGroup.id))
        : appSettings.spoilerSettings.itemGroups.concat(itemGroup);

    setAppSettings({
        ...appSettings,
        spoilerSettings: {
            ...appSettings.spoilerSettings,
            itemGroups,
        },
    });
};

export default ItemGroups;

export { toggleItemGroup };
