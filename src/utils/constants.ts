/* eslint-disable import/extensions */
import characterClassData from "@/data/character-classes.json";
import personalQuestData from "@/data/personal-quests.json";
import itemData from "@/data/items.json";

const characterClasses: CharacterClass[] = characterClassData;

const personalQuests: PersonalQuest[] = personalQuestData;

const items: Item[] = itemData;

const defaultCharacter: Character = {
    name: "",
    experience: 0,
    gold: 0,
    notes: "",
    characterClass: characterClasses[0],
    items: [],
};

export { characterClasses, personalQuests, items, defaultCharacter };
