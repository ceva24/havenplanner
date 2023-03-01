import type { Dispatch, KeyboardEvent, SetStateAction } from "react";
import { Box, Typography } from "@mui/material";
import ItemGroup from "./item-group";
import { addItem } from "@/components/items/items-autocomplete";
import FullScreenDialog from "@/components/core/full-screen-dialog";
import { getItemsByGroup, shouldShowItemSpoilerHint } from "@/services/items";
import { useAppSettingsContext } from "@/hooks/use-app-settings";

interface BrowseItemsDialogProps {
    isOpen: boolean;
    handleClose: () => void;
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const BrowseItemsDialog = ({ isOpen, handleClose, character, setCharacter }: BrowseItemsDialogProps) => {
    const [appSettings] = useAppSettingsContext();

    return (
        <FullScreenDialog title="Browse items" isOpen={isOpen} handleClose={handleClose}>
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {Object.entries(getItemsByGroup(appSettings.spoilerSettings)).map((itemGroup: [string, Item[]]) => {
                    const title: string = itemGroup[0];
                    const items: Item[] = itemGroup[1];

                    return (
                        <ItemGroup
                            key={title}
                            title={title}
                            items={items}
                            handleClose={handleClose}
                            character={character}
                            setCharacter={setCharacter}
                        />
                    );
                })}
            </Box>
            {shouldShowItemSpoilerHint(appSettings.spoilerSettings) && (
                <Box textAlign="center" marginY={3}>
                    <Typography>Change your spoiler settings to see more items...</Typography>
                </Box>
            )}
        </FullScreenDialog>
    );
};

export default BrowseItemsDialog;
