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
    characterMatImageUrl: string;
}
