interface Character {
    name: string;
    experience: number;
    gold: number;
    notes: string;
    characterClass: CharacterClass;
    personalQuest?: PersonalQuest;
}

interface CharacterClass {
    id: number;
    name: string;
    characterIconImageUrl: string;
    characterMatImageUrl: string;
}

interface PersonalQuest {
    id: number;
    name: string;
    imageUrl: string;
}
