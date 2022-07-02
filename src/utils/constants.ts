/* eslint-disable import/extensions */
import characterClassData from "@/data/character-classes.json";
import personalQuestData from "@/data/personal-quests.json";

const characterClasses: CharacterClass[] = characterClassData;

const personalQuests: PersonalQuest[] = personalQuestData;

const defaultCharacter: Character = {
    name: "",
    experience: 0,
    gold: 0,
    notes: "",
    characterClass: characterClasses[0],
};

const defaultPersonalQuestCardImage = "/worldhaven/images/personal-quests/gloomhaven/gh-pq-back.png";

export { characterClasses, personalQuests, defaultCharacter, defaultPersonalQuestCardImage };
