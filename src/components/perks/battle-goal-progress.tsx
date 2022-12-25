import { type Dispatch, type SetStateAction } from "react";
import { Checkbox, Grid } from "@mui/material";
import Image from "@/components/core/image";

interface BattleGoalProgressProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const BattleGoalProgress = ({ character, setCharacter }: BattleGoalProgressProps) => {
    return (
        <Grid container>
            {character.battleGoalCheckmarkGroups.map((battleGoalCheckmarkGroup: BattleGoalCheckmarkGroup) => (
                <Grid key={battleGoalCheckmarkGroup.id} item xs={6} md={4}>
                    <Image
                        webpPath="/images/perk-icons/gloomhaven/check.webp"
                        fallbackImageType="png"
                        altText="check icon"
                        width={30}
                        height={30}
                        style={{ verticalAlign: "middle" }}
                    />{" "}
                    :
                    {battleGoalCheckmarkGroup.checkmarks.map((battleGoalCheckmark: BattleGoalCheckmark) => (
                        <Checkbox
                            key={battleGoalCheckmark.id}
                            sx={{ paddingLeft: 0.2, paddingRight: 0.2 }}
                            checked={battleGoalCheckmark.value}
                            onChange={() => {
                                toggleBattleGoalCheckmark(
                                    battleGoalCheckmarkGroup.id,
                                    battleGoalCheckmark.id,
                                    character,
                                    setCharacter
                                );
                            }}
                        />
                    ))}
                </Grid>
            ))}
        </Grid>
    );
};

const toggleBattleGoalCheckmark = (
    battleGoalCheckmarkGroupId: number,
    battleGoalCheckmarkId: number,
    character: Character,
    setCharacter: Dispatch<SetStateAction<Character>>
) => {
    const newBattleGoalGroups = character.battleGoalCheckmarkGroups.slice();

    const checkmark = newBattleGoalGroups[battleGoalCheckmarkGroupId].checkmarks[battleGoalCheckmarkId];
    checkmark.value = !checkmark.value;

    setCharacter({
        ...character,
        battleGoalCheckmarkGroups: newBattleGoalGroups,
    });
};

export default BattleGoalProgress;
