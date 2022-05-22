import characterClassData from "../../../data/character-classes.json";

const loadCharacterClasses = (): CharacterClass[] => {
    return characterClassData;
};

export { loadCharacterClasses };
