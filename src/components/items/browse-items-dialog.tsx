import type { Dispatch, SetStateAction } from "react";
import { Box, Typography } from "@mui/material";
import ItemGroup from "@/components/items/item-group";
import FullScreenDialog from "@/components/core/full-screen-dialog";
import { getItemsByGroup, shouldShowItemSpoilerHint } from "@/services/items";
import { useSettingsContext } from "@/hooks/use-settings";

interface BrowseItemsDialogProps {
    isOpen: boolean;
    handleClose: () => void;
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const BrowseItemsDialog = ({ isOpen, handleClose, character, setCharacter }: BrowseItemsDialogProps) => {
    const [settings] = useSettingsContext();

    return (
        <FullScreenDialog title="Browse items" isOpen={isOpen} handleClose={handleClose}>
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {Object.entries(getItemsByGroup(settings)).map((itemGroup: [string, Item[]]) => {
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
            {shouldShowItemSpoilerHint(settings) && (
                <Box textAlign="center" marginY={3}>
                    <Typography>Change your spoiler settings to see more items...</Typography>
                </Box>
            )}
        </FullScreenDialog>
    );
};

export default BrowseItemsDialog;