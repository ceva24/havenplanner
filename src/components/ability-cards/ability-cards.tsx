import { Dispatch, SetStateAction, useState } from "react";
import { Box, Stack, Switch, Typography } from "@mui/material";
import { useAppSettingsContext } from "@/hooks/app-settings";
import Button from "@/components/core/button";
import Deck from "@/components/ability-cards/deck/deck";
import Hand from "@/components/ability-cards/hand/hand";

interface AbilityCardsProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const AbilityCards = ({ character, setCharacter }: AbilityCardsProps) => {
    const { appSettings, setAppSettings } = useAppSettingsContext();
    const [showCreateHandButton, setShowCreateHandButton] = useState<boolean>(
        character.hand.length === 0 && !appSettings.showHand
    );

    const createHand = () => {
        setShowCreateHandButton(false);
        toggleHand();
    };

    const toggleHand = () => {
        setAppSettings({ ...appSettings, showHand: !appSettings.showHand });
    };

    return (
        <Box>
            {!showCreateHandButton && (
                <Stack direction="row" justifyContent="center" spacing={1} paddingBottom={3}>
                    <Typography>Deck</Typography>
                    <Switch
                        inputProps={{ "aria-label": "Show hand" }}
                        checked={appSettings.showHand}
                        onChange={toggleHand}
                    />
                    <Typography>Hand</Typography>
                </Stack>
            )}
            {appSettings.showHand ? (
                <Hand character={character} setCharacter={setCharacter} />
            ) : (
                <Deck character={character} setCharacter={setCharacter} />
            )}
            {showCreateHandButton && (
                <Box textAlign="center">
                    <Button text="Create hand" onClick={createHand} />
                </Box>
            )}
        </Box>
    );
};

export default AbilityCards;
