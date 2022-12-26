import { type Dispatch, type SetStateAction } from "react";
import { Checkbox, Grid } from "@mui/material";
import BattleGoalCheckmarkGroupLabel from "@/components/perks/battle-goal-checkmark-group-label";

interface BattleGoalProgressProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const BattleGoalProgress = ({ character, setCharacter }: BattleGoalProgressProps) => {
    return (
        <Grid container component="section" aria-label="Battle Goal Progress">
            {character.battleGoalCheckmarkGroups.map((battleGoalCheckmarkGroup: BattleGoalCheckmarkGroup) => {
                const battleGoalCheckmarkGroupLabelId = `battle-goal-perk-${battleGoalCheckmarkGroup.id}`;
                return (
                    <Grid
                        key={battleGoalCheckmarkGroup.id}
                        item
                        xs={6}
                        md={4}
                        component="section"
                        aria-label={`Battle Goal Perk ${battleGoalCheckmarkGroup.id + 1}`}
                    >
                        <BattleGoalCheckmarkGroupLabel
                            battleGoalCheckmarkGroup={battleGoalCheckmarkGroup}
                            labelId={battleGoalCheckmarkGroupLabelId}
                            character={character}
                            setCharacter={setCharacter}
                        />{" "}
                        :
                        {battleGoalCheckmarkGroup.checkmarks.map((battleGoalCheckmark: BattleGoalCheckmark) => {
                            const styleProps =
                                battleGoalCheckmark.id === 0
                                    ? { "aria-labelledby": battleGoalCheckmarkGroupLabelId }
                                    : {
                                          "aria-label": `Battle Goal Perk ${
                                              battleGoalCheckmarkGroup.id + 1
                                          } Checkmark ${battleGoalCheckmark.id + 1}`,
                                      };

                            return (
                                <Checkbox
                                    key={battleGoalCheckmark.id}
                                    sx={{ paddingLeft: 0.2, paddingRight: 0.2 }}
                                    inputProps={styleProps}
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
                            );
                        })}
                    </Grid>
                );
            })}
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
export { toggleBattleGoalCheckmark };
