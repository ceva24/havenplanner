import characterClassData from "@/data/character-classes.json"; // eslint-disable-line import/extensions

const characterClasses: CharacterClass[] = characterClassData;

const defaultCharacter: Character = {
    name: "",
    experience: 0,
    gold: 0,
    notes: "",
    characterClass: characterClasses[0],
};

export { characterClasses, defaultCharacter };
