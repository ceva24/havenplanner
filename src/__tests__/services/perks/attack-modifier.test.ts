import { attackModifiers } from "@/loaders/attack-modifiers";
import {
    classAttackModifierCardNames,
    orderAttackModifierCards,
    splitAttackModifierDeckIntoBaseAndClass,
} from "@/services/perks/attack-modifier";
import { createTestAttackModifierDeckCard, createTestCharacter } from "@/test/create-test-fixtures";

const perkWithBaseAttackModifier: Perk = {
    id: 1,
    name: "Replace one {-1} card with one {+1} card",
    count: 1,
    add: [
        {
            id: 319,
            name: "+1",
            imageUrl: "/attack-modifiers/gloomhaven/base/player/gh-am-p1-07.webp",
        },
    ],
    remove: [
        {
            id: 324,
            name: "-1",
            imageUrl: "/attack-modifiers/gloomhaven/base/player/gh-am-p1-12.webp",
        },
    ],
};

const perkWithClassAttackModifier: Perk = {
    id: 0,
    name: "Add one {+1} Shield {shield} 1, self card",
    count: 1,
    add: [
        {
            id: 22,
            name: "+1 shield 1 self",
            imageUrl: "/attack-modifiers/gloomhaven/BR/gh-am-br-22.webp",
        },
    ],
    remove: [],
};

describe("classAttackModifierCardNames", () => {
    it("returns names of class-unique attack modifier cards", () => {
        const character: Character = createTestCharacter();
        character.characterClass.perks = [perkWithClassAttackModifier];

        const names = classAttackModifierCardNames(character.characterClass);

        expect(names).toHaveLength(1);
        expect(names[0]).toEqual("+1 shield 1 self");
    });

    it("excludes names of attack modifier cards from the base attack modifier deck", () => {
        const character: Character = createTestCharacter();
        character.characterClass.perks = [perkWithBaseAttackModifier];

        const names = classAttackModifierCardNames(character.characterClass);

        expect(names).toHaveLength(0);
    });
});

describe("splitAttackModifierDeckIntoBaseAndClass", () => {
    it("returns cards from the base modifier deck", () => {
        const deck: AttackModifierDeckCard[] = [createTestAttackModifierDeckCard(1, "+1")];
        const baseDeck: AttackModifierDeckCard[] = [deck[0]];

        const [initialAttackModifiers] = splitAttackModifierDeckIntoBaseAndClass(deck, baseDeck);

        expect(initialAttackModifiers).toHaveLength(1);
        expect(initialAttackModifiers[0]).toEqual(deck[0]);
    });

    it("returns cards from the class modifier deck", () => {
        const deck: AttackModifierDeckCard[] = [
            createTestAttackModifierDeckCard(1, "+1"),
            createTestAttackModifierDeckCard(2, "+3"),
        ];
        const baseDeck: AttackModifierDeckCard[] = [deck[0]];

        const [initialAttackModifiers, classAttackModifiers] = splitAttackModifierDeckIntoBaseAndClass(deck, baseDeck);

        expect(classAttackModifiers).toHaveLength(1);
        expect(classAttackModifiers[0]).toEqual(deck[1]);
    });

    it("returns an empty list when there are no class modifiers", () => {
        const deck: AttackModifierDeckCard[] = [createTestAttackModifierDeckCard(1, "+1")];
        const baseDeck: AttackModifierDeckCard[] = [deck[0]];

        const [initialAttackModifiers, classAttackModifiers] = splitAttackModifierDeckIntoBaseAndClass(deck, baseDeck);

        expect(classAttackModifiers).toHaveLength(0);
    });
});

describe("orderAttackModifierCards", () => {
    it("returns cards ordered by the card names", () => {
        const deck: AttackModifierDeckCard[] = [
            {
                card: {
                    id: 1,
                    imageUrl: "",
                    name: "+1",
                },
                count: 1,
            },
            {
                card: {
                    id: 2,
                    imageUrl: "",
                    name: "-1",
                },
                count: 1,
            },
            {
                card: {
                    id: 3,
                    imageUrl: "",
                    name: "+2",
                },
                count: 1,
            },
        ];
        const order = ["+2", "+1", "-1"];

        const orderedCards = orderAttackModifierCards(deck, order);

        expect(orderedCards).toHaveLength(3);
        expect(orderedCards[0]).toEqual(deck[2]);
        expect(orderedCards[1]).toEqual(deck[0]);
        expect(orderedCards[2]).toEqual(deck[1]);
    });
});
