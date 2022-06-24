interface Character {
    name: string;
    experience: number;
    gold: number;
    notes: string;
    characterClass: CharacterClass;
}

interface CharacterClass {
    id: number;
    name: string;
    characterIconImageUrl: string;
    characterMatImageUrl: string;
}

interface SerializedCharacterData {
    n: string; // Name
    x: number; // Experience
    g: number; // Gold
    d: string; // Notes
    c: number; // Character id
}

interface EncodeCharacterResponse {
    encodedCharacterData: string;
}
