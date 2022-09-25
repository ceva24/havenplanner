import { Dispatch, KeyboardEvent, SetStateAction, useState } from "react";
import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Card } from "@/components/core/cards";
import SelectCardDialog from "@/components/ability-cards/hand/select-card-dialog";

interface HandProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const Hand = ({ character, setCharacter }: HandProps) => {
    const [selectCardDialogOpen, setSelectCardDialogOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setSelectCardDialogOpen(true);
    };

    const handleClose = () => {
        setSelectCardDialogOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (["Space", "Enter"].includes(event.code)) {
            event.preventDefault();
            handleOpen();
        }
    };

    return (
        <>
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {character.hand
                    .sort((a: AbilityCard, b: AbilityCard) => a.id - b.id)
                    .map((abilityCard: AbilityCard) => (
                        <Box key={abilityCard.id} sx={{ margin: 1 }}>
                            <Card src={abilityCard.imageUrl} altText={abilityCard.name} />
                        </Box>
                    ))}
                <Box
                    role="button"
                    tabIndex={0}
                    sx={{ opacity: 0.5, margin: 1, position: "relative", cursor: "pointer" }}
                    onClick={handleOpen}
                    onKeyDown={onKeyDown}
                >
                    <Card src={character.characterClass.cardBackImageUrl} altText="Add card" />
                    <AddIcon sx={{ position: "absolute", top: 3, right: 1 }} />
                </Box>
            </Box>
            <SelectCardDialog
                character={character}
                setCharacter={setCharacter}
                isOpen={selectCardDialogOpen}
                handleClose={handleClose}
            />
        </>
    );
};

export default Hand;
