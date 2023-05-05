import { type Dispatch, type SetStateAction } from "react";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import Image from "@/client/components/core/image";
import { getItemSlots, itemSlotIsActive } from "@/client/services/items";
import { useSettingsContext } from "@/client/hooks/use-settings";

const ItemSlotFilters = () => {
    const [settings, setSettings] = useSettingsContext();
    const slots = getItemSlots();

    const handleChange = (slot: string) => {
        toggleItemSlotFilter(slot, settings, setSettings);
    };

    return (
        <Box component="section" aria-label="Item Slot Filters">
            {slots.map((slot: [string, string]) => (
                <FormControlLabel
                    key={slot[0]}
                    control={
                        <Checkbox
                            checked={itemSlotIsActive(slot[0], settings.filteredItemSlots)}
                            onChange={() => {
                                handleChange(slot[0]);
                            }}
                        />
                    }
                    label={
                        <Box>
                            <Image
                                webpPath={slot[1]}
                                fallbackImageType="png"
                                altText={slot[0]}
                                style={{ verticalAlign: "middle", marginRight: 10 }}
                                height={30}
                                width={30}
                                aria-hidden="true"
                            />
                        </Box>
                    }
                />
            ))}
        </Box>
    );
};

const toggleItemSlotFilter = (slot: string, settings: Settings, setSettings: Dispatch<SetStateAction<Settings>>) => {
    const newFilteredItemSlots = settings.filteredItemSlots.includes(slot)
        ? settings.filteredItemSlots.filter((filteredItemSlot: string) => filteredItemSlot !== slot)
        : settings.filteredItemSlots.concat([slot]);

    setSettings({
        ...settings,
        filteredItemSlots: newFilteredItemSlots,
    });
};

export default ItemSlotFilters;
export { toggleItemSlotFilter };
