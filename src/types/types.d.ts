interface Character {
    name: string;
    experience: number;
    gold: number;
    notes: string;
    characterClass?: CharacterClass | undefined;
}

interface CharacterClass {
    id: number;
    name: string;
    characterMatImageUrl: string;
}
