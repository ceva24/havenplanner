import type { Dispatch, KeyboardEvent, SetStateAction } from "react";
import { Box, Typography } from "@mui/material";
import { addItem } from "@/components/items/items-autocomplete";
import FullScreenDialog from "@/components/core/full-screen-dialog";
import { SmallCard } from "@/components/core/cards";
import { getItemsForSpoilerSettings } from "@/services/items";
import { useAppSettingsContext } from "@/hooks/use-app-settings";

interface ItemsDialogProps {
    isOpen: boolean;
    handleClose: () => void;
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const ItemsDialog = ({ isOpen, handleClose, character, setCharacter }: ItemsDialogProps) => {
    const [appSettings, setAppSettings] = useAppSettingsContext();

    const addItemAndClose = (item: Item) => {
        addItem(item, character, setCharacter);
        handleClose();
    };

    const onKeyDown = (event: KeyboardEvent<HTMLElement>, item: Item) => {
        if (["Space", "Enter"].includes(event.code)) {
            event.preventDefault();
            addItemAndClose(item);
        }
    };

    return (
        <FullScreenDialog title="Browse items" isOpen={isOpen} handleClose={handleClose}>
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {getItemsForSpoilerSettings(appSettings.spoilerSettings.prosperity).map((item: Item) => (
                    <Box
                        key={item.id}
                        role="button"
                        tabIndex={0}
                        sx={{ margin: 1, cursor: "pointer", position: "relative" }}
                        onClick={() => {
                            addItemAndClose(item);
                        }}
                        onKeyDown={(event: KeyboardEvent<HTMLElement>) => {
                            onKeyDown(event, item);
                        }}
                    >
                        <SmallCard src={item.imageUrl} altText={item.name} />
                    </Box>
                ))}
            </Box>
            {appSettings.spoilerSettings.prosperity < 9 && (
                <Box textAlign="center" marginY={3}>
                    <Typography>Change your spoiler settings to see more items...</Typography>
                </Box>
            )}
        </FullScreenDialog>
    );
};

export default ItemsDialog;
