import { Dispatch, SetStateAction } from "react";
import { Character } from "../types/types";

interface CharacterSelectProps {
    characters: Character[];
    setCharacter: Dispatch<SetStateAction<Character | undefined>>;
}

const CharacterSelect: React.FC<CharacterSelectProps> = ({
    characters,
    setCharacter,
}: CharacterSelectProps) => {
    const handleCharacterChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedChar: Character | undefined = characters.find(
            (character: Character) => {
                return character.name === event.target.value;
            }
        );

        setCharacter(selectedChar);
    };

    return (
        <select onChange={handleCharacterChange}>
            <option key={null} value="" />
            {characters.map((character: Character) => {
                return (
                    <option key={character.id} value={character.name}>
                        {character.name}
                    </option>
                );
            })}
        </select>
    );
};

export { CharacterSelect };
