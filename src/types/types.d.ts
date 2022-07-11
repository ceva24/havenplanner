interface Character {
    name: string;
    experience: number;
    gold: number;
    notes: string;
    characterClass: CharacterClass;
    personalQuest?: PersonalQuest;
}

interface Asset {
    id: number;
    name: string;
    imageUrl: string;
}

interface CharacterClass extends Asset {
    characterMatImageUrl: string;
}

interface PersonalQuest extends Asset {}

interface Item extends Asset {}
