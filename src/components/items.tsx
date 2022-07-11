import { Dispatch, SetStateAction } from "react";
import { Box, Grid } from "@mui/material";
import Item from "@/components/items/item";
import ItemsAutocomplete from "@/components/items/items-autocomplete";

interface ItemsProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const Items = ({ character, setCharacter }: ItemsProps) => {
    return (
        <Grid container spacing={5}>
            <Grid item textAlign="center" width="100%">
                <ItemsAutocomplete character={character} setCharacter={setCharacter} />
            </Grid>
            <Grid item lg={12} textAlign="center">
                <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    {character.items.map((characterItem: CharacterItem) => {
                        return (
                            <Item
                                key={characterItem.id}
                                character={character}
                                setCharacter={setCharacter}
                                characterItem={characterItem}
                            />
                        );
                    })}
                </Box>
            </Grid>
        </Grid>
    );
};

export default Items;
