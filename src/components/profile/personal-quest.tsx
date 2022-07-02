import { useState } from "react";
import Card from "@/components/card";
import PersonalQuestDialog from "@/components/profile/personal-quest-dialog";

const PersonalQuestCard = () => {
    const [personalQuestDialogOpen, setPersonalQuestDialogOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setPersonalQuestDialogOpen(true);
    };

    const handleClose = () => {
        setPersonalQuestDialogOpen(false);
    };

    return (
        <>
            <Card
                url="/worldhaven/images/personal-quests/gloomhaven/gh-pq-back.png"
                altText="Personal quest"
                styleProps={{ cursor: "pointer" }}
                onClick={handleOpen}
            />
            <PersonalQuestDialog isOpen={personalQuestDialogOpen} onClose={handleClose} />
        </>
    );
};

export default PersonalQuestCard;
