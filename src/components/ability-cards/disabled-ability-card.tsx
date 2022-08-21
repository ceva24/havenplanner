import { Tooltip } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import { Card } from "@/components/core/cards";

interface DisabledAbilityCardProps {
    abilityCard: AbilityCard;
}

const DisabledAbilityCard = ({ abilityCard }: DisabledAbilityCardProps) => {
    return (
        <Tooltip followCursor title="Cannot unlock this ability card">
            <div
                aria-disabled
                role="checkbox"
                aria-checked={false}
                tabIndex={0}
                style={{ opacity: 0.5, cursor: "not-allowed", position: "relative" }}
            >
                <Card src={abilityCard.imageUrl} altText={abilityCard.name} />
                <BlockIcon sx={{ position: "absolute", top: 3, right: 1 }} />
            </div>
        </Tooltip>
    );
};

export default DisabledAbilityCard;
