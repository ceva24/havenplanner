import type { KeyboardEvent } from "react";
import { Box } from "@mui/material";
import LockIcon from "@mui/icons-material/LockTwoTone";
import { Card } from "@/components/core/cards";

interface ToggleableAbilityCardProps {
    abilityCard: AbilityCard;
    isSelected: boolean;
    action: () => void;
    showLockIcon: boolean;
}

const ToggleableAbilityCard = ({ abilityCard, isSelected, action, showLockIcon }: ToggleableAbilityCardProps) => {
    const onClick = () => {
        action();
    };

    const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (["Space", "Enter"].includes(event.code)) {
            event.preventDefault();
            action();
        }
    };

    return (
        <Box
            role="checkbox"
            aria-checked={isSelected}
            tabIndex={0}
            sx={{ opacity: isSelected ? 1 : 0.5, cursor: "pointer", position: "relative" }}
            onClick={onClick}
            onKeyDown={onKeyDown}
        >
            <Card src={abilityCard.imageUrl} altText={abilityCard.name} />
            {!isSelected && showLockIcon && <LockIcon sx={{ position: "absolute", top: 3, right: 1 }} />}
        </Box>
    );
};

export default ToggleableAbilityCard;
