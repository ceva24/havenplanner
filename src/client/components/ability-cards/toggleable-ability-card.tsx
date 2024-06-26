import type { KeyboardEvent } from "react";
import { Box } from "@mui/material";
import LockIcon from "@mui/icons-material/LockTwoTone";
import AbilityCard from "@/client/components/ability-cards/ability-card";

interface ToggleableAbilityCardProperties {
    readonly abilityCard: AbilityCard;
    readonly character: Character;
    readonly isSelected: boolean;
    readonly action: () => void;
    readonly showLockIcon: boolean;
}

const ToggleableAbilityCard = ({
    abilityCard,
    character,
    isSelected,
    action,
    showLockIcon,
}: ToggleableAbilityCardProperties) => {
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
            <AbilityCard abilityCard={abilityCard} character={character} />
            {!isSelected && showLockIcon && (
                <LockIcon fontSize="large" sx={{ position: "absolute", top: 3, right: 1 }} />
            )}
        </Box>
    );
};

export default ToggleableAbilityCard;
