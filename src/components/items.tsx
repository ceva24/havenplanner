import { Dispatch, SetStateAction } from "react";
import { Grid } from "@mui/material";
import ItemsAutocomplete from "@/components/items/items-autocomplete";
import ItemGrid from "@/components/items/item-grid";

interface ItemsProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const Items = ({ character, setCharacter }: ItemsProps) => {
    return (
        <Grid container spacing={5} textAlign="center">
            <Grid item xs={12}>
                <ItemsAutocomplete character={character} setCharacter={setCharacter} />
            </Grid>
            <Grid item xs={12}>
                <ItemGrid character={character} setCharacter={setCharacter} />
            </Grid>
        </Grid>
    );
};

export default Items;
