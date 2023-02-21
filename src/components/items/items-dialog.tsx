import type { Dispatch, KeyboardEvent, SetStateAction } from "react";
import { Box } from "@mui/material";
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
        </FullScreenDialog>
    );
};

export default ItemsDialog;
