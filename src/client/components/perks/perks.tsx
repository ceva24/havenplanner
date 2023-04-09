import type { Dispatch, SetStateAction } from "react";
import { Box, Grid } from "@mui/material";
import PerkList from "@/client/components/perks/perk-list";
import AttackModifiers from "@/client/components/perks/attack-modifiers";
import BattleGoalProgress from "@/client/components/perks/battle-goal-progress";

interface PerksProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const Perks = ({ character, setCharacter }: PerksProps) => {
    return (
        <Grid container spacing={10}>
            <Grid item lg={5} xl={4} sx={{ marginLeft: "auto", marginRight: "auto" }}>
                <Box>
                    <PerkList character={character} setCharacter={setCharacter} />
                </Box>
                <Box sx={{ marginTop: 8 }} textAlign="center">
                    <BattleGoalProgress character={character} setCharacter={setCharacter} />
                </Box>
            </Grid>
            <Grid item lg={7} xl={8}>
                <AttackModifiers character={character} />
            </Grid>
        </Grid>
    );
};

export default Perks;
