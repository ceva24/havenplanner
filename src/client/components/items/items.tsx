import { type Dispatch, type SetStateAction, useState } from "react";
import { Grid, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@/client/components/core/button";
import BrowseItemsDialog from "@/client/components/items/browse-items-dialog";
import ItemsAutocomplete from "@/client/components/items/items-autocomplete";
import ItemGrid from "@/client/components/items/item-grid";
import { useSettingsContext } from "@/client/hooks/use-settings";

interface ItemsProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const Items = ({ character, setCharacter }: ItemsProps) => {
    const [settings, setSettings] = useSettingsContext();
    const [itemsDialogOpen, setItemsDialogOpen] = useState<boolean>(false);

    return (
        <Grid container spacing={5}>
            <Grid item xs={12}>
                <Stack direction="row" spacing={3} justifyContent="center">
                    <ItemsAutocomplete character={character} setCharacter={setCharacter} />
                    <Button
                        id="browse-items-button"
                        text="Browse Items"
                        startIcon={<SearchIcon />}
                        onClick={() => {
                            setItemsDialogOpen(true);
                        }}
                    />
                    <BrowseItemsDialog
                        isOpen={itemsDialogOpen}
                        handleClose={() => {
                            closeBrowseItemsDialog(setItemsDialogOpen, settings, setSettings);
                        }}
                        character={character}
                        setCharacter={setCharacter}
                    />
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <ItemGrid character={character} setCharacter={setCharacter} />
            </Grid>
        </Grid>
    );
};

const closeBrowseItemsDialog = (
    setItemsDialogOpen: Dispatch<SetStateAction<boolean>>,
    settings: Settings,
    setSettings: Dispatch<SetStateAction<Settings>>
) => {
    setItemsDialogOpen(false);

    setTimeout(() => {
        setSettings({
            ...settings,
            userSettings: {
                ...settings.userSettings,
                filteredItemSlots: [],
            },
        });
    }, 100);
};

export default Items;
export { closeBrowseItemsDialog };
