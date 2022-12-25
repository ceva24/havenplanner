import { Checkbox, Grid } from "@mui/material";
import groupBy from "lodash.groupby";
import Image from "@/components/core/image";

const BattleGoals = () => {
    const groups: Record<string, number[]> = sixGroupsOfThree();

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
                    {groups[key].map((index: number) => (
                        <Checkbox key={index} sx={{ paddingLeft: 0.2, paddingRight: 0.2 }} />
                    ))}
                </Grid>
            ))}
        </Grid>
    );
};

const sixGroupsOfThree = (): Record<string, number[]> => {
    return groupBy(Array.from(Array.from({ length: 18 }).keys()), (index: number) => Math.floor(index / 3));
};

export default BattleGoals;
