import characterClassData from "../../data/character-classes.json";

const characterClasses: CharacterClass[] = characterClassData;

const initialCharacter: Character = {
    name: "",
    experience: 0,
    gold: 0,
    notes: "",
    characterClass: characterClasses[0],
};

export { characterClasses, initialCharacter };
