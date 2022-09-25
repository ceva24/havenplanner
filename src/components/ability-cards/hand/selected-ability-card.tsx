import { Box, Tooltip } from "@mui/material";
import HandIcon from "@mui/icons-material/PanTool";
import { Card } from "@/components/core/cards";

interface SelectedAbilityCardProps {
    abilityCard: AbilityCard;
}

const SelectedAbilityCard = ({ abilityCard }: SelectedAbilityCardProps) => {
    return (
        <Tooltip followCursor title="This ability card is already in your hand">
            <Box
                aria-disabled
                role="button"
                tabIndex={0}
                sx={{ opacity: 0.5, cursor: "not-allowed", position: "relative" }}
            >
                <Card src={abilityCard.imageUrl} altText={abilityCard.name} />
                <HandIcon sx={{ position: "absolute", top: 3, right: 1 }} />
            </Box>
        </Tooltip>
    );
};

export default SelectedAbilityCard;
