import type { Dispatch, SetStateAction } from "react";
import { Grid } from "@mui/material";
import PerkList from "./perk-list";
import AttackModifiers from "@/components/perks/attack-modifiers";

interface PerksProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const Perks = ({ character, setCharacter }: PerksProps) => {
    return (
        <Grid container spacing={10}>
            <Grid item lg={4}>
                <PerkList character={character} setCharacter={setCharacter} />
            </Grid>
            <Grid item lg={8}>
                <AttackModifiers gainedPerks={character.gainedPerks} />
            </Grid>
        </Grid>
    );
};

export default Perks;
