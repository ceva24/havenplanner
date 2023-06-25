import {
    abilityCardCanBeToggled,
    abilityCardCanBeUnlockedForCharacter,
    abilityCardLevelIsSelectable,
    groupCharacterCardsByLevel,
    isUnlockedAbilityCardForCharacter,
    uniqueOrderedCardLevels,
} from "@/client/services/ability-cards/deck";
import { createTestAbilityCard, createTestCharacter } from "@/test/create-test-fixtures";

const character: Character = createTestCharacter();

character.characterClass.abilityCards = [
    createTestAbilityCard(1, "1"),
    createTestAbilityCard(2, "X"),
    createTestAbilityCard(3, "2"),
    createTestAbilityCard(4, "2"),
    createTestAbilityCard(5, "3"),
    createTestAbilityCard(6, "M"),
];

beforeEach(() => {
    character.experience = 0;
    character.unlockedAbilityCards = [];
});

describe("isUnlockedAbilityCardForCharacter", () => {
    it("returns true when the character's unlocked ability cards includes this card", () => {
        character.unlockedAbilityCards = [character.characterClass.abilityCards[0]];

        const result = isUnlockedAbilityCardForCharacter(character, character.characterClass.abilityCards[0]);

        expect(result).toEqual(true);
    });

    it("returns false when the character's unlocked ability cards does not include this card", () => {
        const result = isUnlockedAbilityCardForCharacter(character, character.characterClass.abilityCards[0]);

        expect(result).toEqual(false);
    });
});

describe("abilityCardCanBeUnlockedForCharacter", () => {
    it("returns true when the character has unlocks remaining, is the same level as the card, and has not already unlocked the other card at this level", () => {
        character.experience = 100;
        character.unlockedAbilityCards = [character.characterClass.abilityCards[2]];

        const result = abilityCardCanBeUnlockedForCharacter(character, character.characterClass.abilityCards[3]);

        expect(result).toEqual(true);
    });

    it("returns true when the character has unlocks remaining, is a higher level than the card, and has already unlocked the other card at this level", () => {
        character.experience = 100;
        character.unlockedAbilityCards = [character.characterClass.abilityCards[2]];

        const result = abilityCardCanBeUnlockedForCharacter(character, character.characterClass.abilityCards[3]);

        expect(result).toEqual(true);
    });

    it("returns false when the character has unlocks remaining, is the same level as the card, and has already unlocked the other card at this level", () => {
        character.experience = 55;
        character.unlockedAbilityCards = [character.characterClass.abilityCards[2]];

        const result = abilityCardCanBeUnlockedForCharacter(character, character.characterClass.abilityCards[3]);

        expect(result).toEqual(false);
    });

    it("returns false when the character has unlocks remaining but the card is of a higher level", () => {
        character.experience = 55;

        const result = abilityCardCanBeUnlockedForCharacter(character, character.characterClass.abilityCards[4]);

        expect(result).toEqual(false);
    });

    it("returns false when the character has no unlocks remaining", () => {
        character.experience = 100;
        character.unlockedAbilityCards = [
            character.characterClass.abilityCards[3],
            character.characterClass.abilityCards[4],
        ];

        const result = abilityCardCanBeUnlockedForCharacter(character, character.characterClass.abilityCards[2]);

        expect(result).toEqual(false);
    });

    it("does not error if the card level is non-numeric", () => {
        const unlockNonNumeric = () =>
            abilityCardCanBeUnlockedForCharacter(character, character.characterClass.abilityCards[1]);

        expect(unlockNonNumeric).not.toThrowError();
    });
});

describe("abilityCardCanBeToggled", () => {
    it("returns true if the ability card has been unlocked", () => {
        const abilityCard = character.characterClass.abilityCards[2];

        character.unlockedAbilityCards = [abilityCard];

        expect(abilityCardCanBeToggled(abilityCard, character)).toEqual(true);
    });

    it("returns true if the ability card can be unlocked", () => {
        character.experience = 55;
        const abilityCard = character.characterClass.abilityCards[2];

        expect(abilityCardCanBeToggled(abilityCard, character)).toEqual(true);
    });

    it("returns false if the ability card has not been and cannot be unlocked", () => {
        const abilityCard = character.characterClass.abilityCards[2];

        expect(abilityCardCanBeToggled(abilityCard, character)).toEqual(false);
    });
});

describe("groupCardsByLevel", () => {
    it("groups cards by level", () => {
        const groups = groupCharacterCardsByLevel(character);

        expect(Object.keys(groups)).toEqual(["1", "2", "3", "X", "M"]);
        expect(groups["1"]).toHaveLength(1);
        expect(groups["2"]).toHaveLength(2);
        expect(groups["3"]).toHaveLength(1);
        expect(groups.X).toHaveLength(1);
        expect(groups.M).toHaveLength(1);
    });
});

describe("uniqueOrderedCardLevels", () => {
    it("returns a unique ordered list of levels", () => {
        const groups = groupCharacterCardsByLevel(character);

        const uniqueLevels = uniqueOrderedCardLevels(groups);

        expect(uniqueLevels).toEqual(["1", "M", "X", "2", "3"]);
    });
});

describe("abilityCardLevelIsSelectable", () => {
    interface LevelIsSelectableProps {
        level: string;
        isSelectable: boolean;
    }

    it.each`
        level   | isSelectable
        ${"1"}  | ${false}
        ${"M"}  | ${false}
        ${"X"}  | ${false}
        ${"2"}  | ${true}
        ${"3"}  | ${true}
        ${"4"}  | ${true}
        ${"5"}  | ${true}
        ${"6"}  | ${true}
        ${"7"}  | ${true}
        ${"8"}  | ${true}
        ${"9"}  | ${true}
        ${"0"}  | ${false}
        ${"-1"} | ${false}
        ${""}   | ${false}
    `(
        "checking whether level $level cards are selectable returns $isSelectable",
        ({ level, isSelectable }: LevelIsSelectableProps) => {
            const result = abilityCardLevelIsSelectable(level);

            expect(result).toEqual(isSelectable);
        }
    );
});
