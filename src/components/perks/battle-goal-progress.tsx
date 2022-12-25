import { type Dispatch, type SetStateAction } from "react";
import { Checkbox, Grid } from "@mui/material";
import groupBy from "lodash.groupby";
import Image from "@/components/core/image";

interface BattleGoalProgressProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const BattleGoalProgress = ({ character, setCharacter }: BattleGoalProgressProps) => {
    const groups: Record<string, BattleGoalCheckmark[]> = groupsOfThree(character.battleGoalCheckmarks);

    return (
        <Grid container>
            {Object.keys(groups).map((key: string) => (
                <Grid key={key} item xs={6} md={4}>
                    <Image
                        webpPath="/images/perk-icons/gloomhaven/check.webp"
                        fallbackImageType="png"
                        altText="check icon"
                        width={30}
                        height={30}
                        style={{ verticalAlign: "middle" }}
                    />{" "}
                    :
                    {groups[key].map((battleGoalCheckmark: BattleGoalCheckmark) => (
                        <Checkbox
                            key={battleGoalCheckmark.id}
                            sx={{ paddingLeft: 0.2, paddingRight: 0.2 }}
                            checked={battleGoalCheckmark.value}
                            onChange={() => {
                                toggleBattleGoalProgress(battleGoalCheckmark, character, setCharacter);
                            }}
                        />
                    ))}
                </Grid>
            ))}
        </Grid>
    );
};

const groupsOfThree = (battleGoalCheckmarks: BattleGoalCheckmark[]): Record<string, BattleGoalCheckmark[]> => {
    return groupBy(battleGoalCheckmarks, (battleGoalCheckmark: BattleGoalCheckmark) =>
        Math.floor(battleGoalCheckmark.id / 3)
    );
};

const toggleBattleGoalProgress = (
    battleGoalCheckmark: BattleGoalCheckmark,
    character: Character,
    setCharacter: Dispatch<SetStateAction<Character>>
) => {
    const newBattleGoalProgress = character.battleGoalCheckmarks.slice();

    const battleGoalProgress = newBattleGoalProgress.find(
        (checkmark: BattleGoalCheckmark) => checkmark.id === battleGoalCheckmark.id
    );

    if (battleGoalProgress) battleGoalProgress.value = !battleGoalProgress.value;

    setCharacter({
        ...character,
        battleGoalCheckmarks: newBattleGoalProgress,
    });
};

export default BattleGoalProgress;
