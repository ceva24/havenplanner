import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@mui/material";
import Card from "@/components/card";
import PersonalQuestDialog from "@/components/profile/personal-quest-dialog";
import { defaultPersonalQuestCardImageUrl } from "@/utils/constants";

interface PersonalQuestCardProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const PersonalQuestCard = ({ character, setCharacter }: PersonalQuestCardProps) => {
    const [personalQuestDialogOpen, setPersonalQuestDialogOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setPersonalQuestDialogOpen(true);
    };

    const handleClose = () => {
        setPersonalQuestDialogOpen(false);
    };

    return (
        <>
            <Button aria-label="Personal quest" onClick={handleOpen}>
                <Card url={defaultPersonalQuestCardImageUrl} altText="Personal quest card" />
            </Button>
            <PersonalQuestDialog
                character={character}
                setCharacter={setCharacter}
                isOpen={personalQuestDialogOpen}
                onClose={handleClose}
            />
        </>
    );
};

export default PersonalQuestCard;
