import { Grid } from "@mui/material";
import PerkList from "./perk-list";
import AttackModifiers from "@/components/perks/attack-modifiers";

interface PerksProps {
    character: Character;
}

const Perks = ({ character }: PerksProps) => {
    return (
        <Grid container spacing={10}>
            <Grid item lg={4}>
                <PerkList character={character} />
            </Grid>
            <Grid item lg={8}>
                <AttackModifiers />
            </Grid>
        </Grid>
    );
};

export default Perks;
