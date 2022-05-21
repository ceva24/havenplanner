import characterData from "../../../data/characters.json";
import { Character } from "../../types/types";

const loadCharacters = (): Character[] => {
    return characterData;
};

export { loadCharacters };
