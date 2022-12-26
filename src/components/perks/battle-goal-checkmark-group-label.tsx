import { type Dispatch, type SetStateAction } from "react";
import { FormLabel } from "@mui/material";
import Image from "@/components/core/image";
import { toggleBattleGoalCheckmark } from "@/components/perks/battle-goal-progress";

interface BattleGoalCheckmarkGroupLabelProps {
    checkmarkGroup: BattleGoalCheckmarkGroup;
    labelId: string;
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const BattleGoalCheckmarkGroupLabel = ({
    checkmarkGroup,
    labelId,
    character,
    setCharacter,
}: BattleGoalCheckmarkGroupLabelProps) => {
    const handleLabelClick = () => {
        if (checkmarkGroup.checkmarks.every((checkmark: BattleGoalCheckmark) => checkmark.value)) {
            removeCheckmarksForBattleGoalCheckmarkGroup(checkmarkGroup, character, setCharacter);
        } else {
            const firstUngainedCheckmark = checkmarkGroup.checkmarks.find(
                (checkmark: BattleGoalCheckmark) => !checkmark.value
            );

            if (firstUngainedCheckmark)
                toggleBattleGoalCheckmark(checkmarkGroup.id, firstUngainedCheckmark.id, character, setCharacter);
        }
    };

    return (
        <FormLabel
            id={labelId}
            sx={{ cursor: "pointer" }}
            aria-label={`Battle Goal Perk ${checkmarkGroup.id + 1} Checkmark`}
            onClick={handleLabelClick}
        >
            <Image
                webpPath="/images/perk-icons/gloomhaven/check.webp"
                fallbackImageType="png"
                altText="check icon"
                width={30}
                height={30}
                style={{ verticalAlign: "middle" }}
            />
        </FormLabel>
    );
};

const removeCheckmarksForBattleGoalCheckmarkGroup = (
    battleGoalCheckmarkGroup: BattleGoalCheckmarkGroup,
    character: Character,
    setCharacter: Dispatch<SetStateAction<Character>>
) => {
    const newBattleGoalCheckmarkGroups = character.battleGoalCheckmarkGroups.slice();

    newBattleGoalCheckmarkGroups[battleGoalCheckmarkGroup.id].checkmarks.forEach(
        (battleGoalCheckmark: BattleGoalCheckmark) => {
            battleGoalCheckmark.value = false;
        }
    );

    setCharacter({
        ...character,
        battleGoalCheckmarkGroups: newBattleGoalCheckmarkGroups,
    });
};

export default BattleGoalCheckmarkGroupLabel;
export { removeCheckmarksForBattleGoalCheckmarkGroup };
