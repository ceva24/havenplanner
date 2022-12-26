import { type Dispatch, type SetStateAction } from "react";
import { FormLabel } from "@mui/material";
import Image from "@/components/core/image";

interface BattleGoalCheckmarkGroupLabelProps {
    battleGoalCheckmarkGroup: BattleGoalCheckmarkGroup;
    labelId: string;
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const BattleGoalCheckmarkGroupLabel = ({
    battleGoalCheckmarkGroup,
    labelId,
    character,
    setCharacter,
}: BattleGoalCheckmarkGroupLabelProps) => {
    const handleLabelClick = () => {
        if (
            battleGoalCheckmarkGroup.checkmarks.every(
                (battleGoalCheckmark: BattleGoalCheckmark) => battleGoalCheckmark.value
            )
        ) {
            removeCheckmarksForBattleGoalCheckmarkGroup(battleGoalCheckmarkGroup, character, setCharacter);
        }
    };

    return (
        <FormLabel
            id={labelId}
            sx={{ cursor: "pointer" }}
            aria-label={`Battle Goal Perk ${battleGoalCheckmarkGroup.id + 1} Checkmark`}
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
