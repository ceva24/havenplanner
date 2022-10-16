import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { Box, Stack, Switch, Typography } from "@mui/material";
import { useAppSettingsContext } from "@/hooks/app-settings";
import Button from "@/components/core/button";
import Deck from "@/components/ability-cards/deck/deck";
import Hand from "@/components/ability-cards/hand/hand";
import SelectCardDialog from "@/components/ability-cards/hand/select-card-dialog";

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
        openSelectCardDialog();

        setTimeout(() => {
            setShowCreateHandButton(false);
            toggleHand();
        }, 250);
    };

    const toggleHand = () => {
        setAppSettings({ ...appSettings, showHand: !appSettings.showHand });
    };

    const [selectCardDialogOpen, setSelectCardDialogOpen] = useState<boolean>(false);

    const openSelectCardDialog = () => {
        setSelectCardDialogOpen(true);
    };

    const closeSelectCardDialog = () => {
        setSelectCardDialogOpen(false);
    };

    return (
        <>
            <Box>
                {!showCreateHandButton && (
                    <Stack direction="row" justifyContent="center" spacing={1} paddingBottom={3}>
                        <Typography>Deck</Typography>
                        <Switch
                            id="show-hand-switch"
                            inputProps={{ "aria-label": "Show hand" }}
                            checked={appSettings.showHand}
                            onChange={toggleHand}
                        />
                        <Typography>Hand</Typography>
                    </Stack>
                )}
                {appSettings.showHand ? (
                    <Hand character={character} openSelectCardDialog={openSelectCardDialog} />
                ) : (
                    <Deck character={character} setCharacter={setCharacter} />
                )}
                {showCreateHandButton && (
                    <Box textAlign="center">
                        <Button text="Create hand" onClick={createHand} />
                    </Box>
                )}
            </Box>
            <SelectCardDialog
                character={character}
                setCharacter={setCharacter}
                isOpen={selectCardDialogOpen}
                handleClose={closeSelectCardDialog}
            />
        </>
    );
};

export default AbilityCards;
