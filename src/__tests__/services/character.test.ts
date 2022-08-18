import { calculateLevel } from "@/services/character";

describe("character", () => {
    interface ExperienceLevelProps {
        experience: number;
        level: number;
    }

    it.each`
        experience    | level
        ${0}          | ${1}
        ${44}         | ${1}
        ${45}         | ${2}
        ${46}         | ${2}
        ${95}         | ${3}
        ${150}        | ${4}
        ${210}        | ${5}
        ${275}        | ${6}
        ${345}        | ${7}
        ${420}        | ${8}
        ${499}        | ${8}
        ${500}        | ${9}
        ${501}        | ${9}
        ${9_000_000}  | ${9}
        ${-45}        | ${1}
        ${Number.NaN} | ${1}
    `(
        "sets the character level to $level when the experience value is $experience",
        ({ experience, level }: ExperienceLevelProps) => {
            const character: Character = {
                name: "My Char",
                experience,
                gold: 50,
                notes: "Hello haven",
                characterClass: {
                    id: 0,
                    name: "Brute",
                    imageUrl: "/worldhaven/images/character-icons/gloomhaven/gh-brute.webp",
                    characterMatFrontImageUrl: "/worldhaven/images/character-mats/gloomhaven/gh-brute.webp",
                    characterMatBackImageUrl: "/worldhaven/images/character-mats/gloomhaven/gh-brute-back.webp",
                    abilityCards: [],
                },
                items: [],
                unlockedAbilityCards: [],
            };

            expect(calculateLevel(character)).toEqual(level);
        }
    );
});
