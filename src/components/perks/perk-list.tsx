import { FormControlLabel, Checkbox, Box } from "@mui/material";

interface PerkListProps {
    character: Character;
}

const PerkList = ({ character }: PerkListProps) => {
    return (
        <Box component="section" aria-label="Perk List">
            {character.characterClass.perks.map((perk: Perk) => (
                <Box key={perk.description}>
                    <FormControlLabel
                        control={
                            <>
                                {Array.from({ length: perk.count }).map((item, index) => (
                                    // eslint-disable-next-line react/no-array-index-key
                                    <Checkbox key={index} />
                                ))}
                            </>
                        }
                        label={perk.description}
                    />
                </Box>
            ))}
        </Box>
    );
};

export default PerkList;
