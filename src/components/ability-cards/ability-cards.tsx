import { Dispatch, SetStateAction, useState } from "react";
import { Box, Stack, Switch, Typography } from "@mui/material";
import Deck from "@/components/ability-cards/deck";
import Hand from "@/components/ability-cards/hand";
import { useAppSettingsContext } from "@/hooks/app-settings";

interface AbilityCardsProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const AbilityCards = ({ character, setCharacter }: AbilityCardsProps) => {
    const { appSettings, setAppSettings } = useAppSettingsContext();

    const handleChange = () => {
        setAppSettings({ ...appSettings, showHand: !appSettings.showHand });
    };

    return (
        <Box>
            <Stack direction="row" justifyContent="center" spacing={1} paddingBottom={3}>
                <Typography>Deck</Typography>
                <Switch
                    inputProps={{ "aria-label": "Show hand" }}
                    checked={appSettings.showHand}
                    onChange={handleChange}
                />
                <Typography>Hand</Typography>
            </Stack>
            {appSettings.showHand ? (
                <Hand character={character} setCharacter={setCharacter} />
            ) : (
                <Deck character={character} setCharacter={setCharacter} />
            )}
        </Box>
    );
};

export default AbilityCards;
