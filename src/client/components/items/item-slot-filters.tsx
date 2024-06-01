import { type Dispatch, type SetStateAction } from "react";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import Image from "@/client/components/core/image";
import { itemSlotIsActive } from "@/client/services/items";
import { useSettingsContext } from "@/client/hooks/use-settings";

const ItemSlotFilters = () => {
    const [settings, setSettings] = useSettingsContext();
    const itemSlots: ItemSlot[] = settings.gameData.itemSlots;

    const handleChange = (slot: ItemSlot) => {
        toggleItemSlotFilter(slot, settings, setSettings);
    };

    return (
        <Box component="section" aria-label="Item Slot Filters">
            {itemSlots.map((slot: ItemSlot) => {
                return (
                    <FormControlLabel
                        key={slot.id}
                        control={
                            <Checkbox
                                aria-label={slot.name}
                                checked={itemSlotIsActive(slot.name, settings.userSettings.filteredItemSlots)}
                                onChange={() => {
                                    handleChange(slot);
                                }}
                            />
                        }
                        label={
                            <Box>
                                <Image
                                    webpPath={slot.imageUrl}
                                    fallbackImageType="png"
                                    altText={slot.name}
                                    style={{ verticalAlign: "middle", marginRight: 10 }}
                                    height={30}
                                    width={30}
                                    aria-hidden="true"
                                />
                            </Box>
                        }
                    />
                );
            })}
        </Box>
    );
};

const toggleItemSlotFilter = (slot: ItemSlot, settings: Settings, setSettings: Dispatch<SetStateAction<Settings>>) => {
    const newFilteredItemSlots = settings.userSettings.filteredItemSlots.some(
        (filteredSlot: ItemSlot) => filteredSlot.id === slot.id,
    )
        ? settings.userSettings.filteredItemSlots.filter(
              (filteredItemSlot: ItemSlot) => filteredItemSlot.id !== slot.id,
          )
        : settings.userSettings.filteredItemSlots.concat([slot]);

    setSettings({
        ...settings,
        userSettings: {
            ...settings.userSettings,
            filteredItemSlots: newFilteredItemSlots,
        },
    });
};

export default ItemSlotFilters;
export { toggleItemSlotFilter };
