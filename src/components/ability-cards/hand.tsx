import { useState } from "react";
import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Card } from "@/components/core/cards";
import SelectCardDialog from "@/components/ability-cards/select-card-dialog";

interface HandProps {
    character: Character;
}

const Hand = ({ character }: HandProps) => {
    const [selectCardDialogOpen, setSelectCardDialogOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setSelectCardDialogOpen(true);
    };

    const handleClose = () => {
        setSelectCardDialogOpen(false);
    };

    return (
        <>
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                <Box
                    role="button"
                    tabIndex={0}
                    sx={{ opacity: 0.5, margin: 1, position: "relative", cursor: "pointer" }}
                    onClick={handleOpen}
                >
                    <Card src={character.characterClass.cardBackImageUrl} altText="Add card" />
                    <AddIcon sx={{ position: "absolute", top: 3, right: 1 }} />
                </Box>
            </Box>
            <SelectCardDialog character={character} isOpen={selectCardDialogOpen} handleClose={handleClose} />
        </>
    );
};

export default Hand;
