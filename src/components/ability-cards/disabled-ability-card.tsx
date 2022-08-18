import { Tooltip } from "@mui/material";
import LockIcon from "@mui/icons-material/LockTwoTone";
import { Card } from "@/components/cards";

interface DisabledAbilityCardProps {
    abilityCard: AbilityCard;
}

const DisabledAbilityCard = ({ abilityCard }: DisabledAbilityCardProps) => {
    return (
        <Tooltip followCursor title="Cannot unlock this card">
            <div
                role="checkbox"
                aria-checked={false}
                tabIndex={0}
                style={{ opacity: 0.5, cursor: "not-allowed", position: "relative" }}
            >
                <Card src={abilityCard.imageUrl} altText={abilityCard.name} />
                <LockIcon sx={{ position: "absolute", top: 3, right: 1 }} />
            </div>
        </Tooltip>
    );
};

export default DisabledAbilityCard;
