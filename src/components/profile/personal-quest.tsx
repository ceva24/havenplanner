import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@mui/material";
import Card from "@/components/card";
import PersonalQuestDialog from "@/components/profile/personal-quest-dialog";

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
                <Card
                    url="/worldhaven/images/personal-quests/gloomhaven/gh-pq-back.png"
                    altText="Personal quest card"
                    styleProps={{ cursor: "pointer" }}
                />
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
