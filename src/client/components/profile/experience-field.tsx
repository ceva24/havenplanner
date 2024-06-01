import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { TextField } from "@mui/material";
import { calculateLevel, updateHand, updateUnlockedAbilityCards } from "@/client/services/profile";

interface ExperienceFieldProperties {
    readonly character: Character;
    readonly setCharacter: Dispatch<SetStateAction<Character>>;
    readonly handleChange: (field: string, isNumber: boolean) => (event: ChangeEvent<HTMLInputElement>) => void;
}

const ExperienceField = ({ character, setCharacter, handleChange }: ExperienceFieldProperties) => {
    const handleExperienceLoseBlur = () => {
        const newLevel = calculateLevel(character.experience);

        setCharacter({
            ...character,
            unlockedAbilityCards: updateUnlockedAbilityCards(character.unlockedAbilityCards, newLevel),
            hand: updateHand(character.hand, newLevel),
        });
    };

    return (
        <TextField
            sx={{ width: "48%", margin: "1%" }}
            id="experience"
            label="Experience"
            value={character.experience || ""}
            onChange={handleChange("experience", true)}
            onBlur={handleExperienceLoseBlur}
        />
    );
};

export default ExperienceField;
