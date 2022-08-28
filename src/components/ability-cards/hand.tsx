import { Dispatch, SetStateAction } from "react";
import { Typography } from "@mui/material";

interface DeckProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const Hand = ({ character, setCharacter }: DeckProps) => {
    return <Typography>Deck</Typography>;
};

export default Hand;
