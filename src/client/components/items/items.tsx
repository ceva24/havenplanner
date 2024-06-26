import { type Dispatch, type SetStateAction, useState } from "react";
import { Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Button, IconButton } from "@/client/components/core/button";
import BrowseItemsDialog from "@/client/components/items/browse-items-dialog";
import ItemsAutocomplete from "@/client/components/items/items-autocomplete";
import ItemGrid from "@/client/components/items/item-grid";
import { useSettingsContext } from "@/client/hooks/use-settings";

interface ItemsProperties {
    readonly character: Character;
    readonly setCharacter: Dispatch<SetStateAction<Character>>;
}

const Items = ({ character, setCharacter }: ItemsProperties) => {
    const [settings, setSettings] = useSettingsContext();
    const [itemsDialogOpen, setItemsDialogOpen] = useState<boolean>(false);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Grid container spacing={5}>
            <Grid item xs={12}>
                <Stack direction="row" spacing={3} justifyContent="center">
                    <ItemsAutocomplete character={character} setCharacter={setCharacter} />
                    {isSmallScreen ? (
                        <IconButton
                            id="browse-items-button"
                            label="Browse"
                            icon={<SearchIcon />}
                            onClick={() => {
                                setItemsDialogOpen(true);
                            }}
                        />
                    ) : (
                        <Button
                            id="browse-items-button"
                            text="Browse"
                            startIcon={<SearchIcon />}
                            onClick={() => {
                                setItemsDialogOpen(true);
                            }}
                        />
                    )}
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
    setSettings: Dispatch<SetStateAction<Settings>>,
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
