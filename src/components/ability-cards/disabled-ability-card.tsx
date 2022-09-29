import { Box, Tooltip } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import { Card } from "@/components/core/cards";

interface DisabledAbilityCardProps {
    abilityCard: AbilityCard;
    tooltipText: string;
}

const DisabledAbilityCard = ({ abilityCard, tooltipText }: DisabledAbilityCardProps) => {
    return (
        <Tooltip followCursor title={tooltipText}>
            <Box
                aria-disabled
                role="checkbox"
                aria-checked={false}
                tabIndex={0}
                sx={{ opacity: 0.5, cursor: "not-allowed", position: "relative" }}
            >
                <Card src={abilityCard.imageUrl} altText={abilityCard.name} />
                <BlockIcon sx={{ position: "absolute", top: 3, right: 1 }} />
            </Box>
        </Tooltip>
    );
};

export default DisabledAbilityCard;
