import { type Dispatch, type SetStateAction, useState } from "react";
import { Grid, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ItemsDialog from "@/components/items/items-dialog";
import { IconButton } from "@/components/core/button";
import ItemsAutocomplete from "@/components/items/items-autocomplete";
import ItemGrid from "@/components/items/item-grid";

interface ItemsProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const Items = ({ character, setCharacter }: ItemsProps) => {
    const [itemsDialogOpen, setItemsDialogOpen] = useState<boolean>(false);

    return (
        <Grid container spacing={5}>
            <Grid item xs={12}>
                <Stack direction="row" spacing={3} justifyContent="center">
                    <ItemsAutocomplete character={character} setCharacter={setCharacter} />
                    <IconButton
                        label="Browse Items"
                        icon={<SearchIcon />}
                        onClick={() => {
                            setItemsDialogOpen(true);
                        }}
                    />
                    <ItemsDialog
                        isOpen={itemsDialogOpen}
                        handleClose={() => {
                            setItemsDialogOpen(false);
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

export default Items;
