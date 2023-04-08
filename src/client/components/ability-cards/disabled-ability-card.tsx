import { Box, Tooltip } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import AbilityCard from "@/client/components/ability-cards/ability-card";

interface DisabledAbilityCardProps {
    abilityCard: AbilityCard;
    character: Character;
    tooltipText: string;
}

const DisabledAbilityCard = ({ abilityCard, character, tooltipText }: DisabledAbilityCardProps) => {
    return (
        <Tooltip followCursor title={tooltipText}>
            <Box
                aria-disabled
                role="checkbox"
                aria-checked={false}
                tabIndex={0}
                sx={{ opacity: 0.5, cursor: "not-allowed", position: "relative" }}
            >
                <AbilityCard abilityCard={abilityCard} character={character} />
                <BlockIcon fontSize="large" sx={{ position: "absolute", top: 3, right: 1 }} />
            </Box>
        </Tooltip>
    );
};

export default DisabledAbilityCard;
