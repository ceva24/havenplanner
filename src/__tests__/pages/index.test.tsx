import { render, screen } from "@testing-library/react";
import { InferGetStaticPropsType } from "next";
import Index, { getStaticProps } from "../../pages/index";
import { initialCharacter } from "../../utils/constants";

const character: Character = {
    name: "",
    experience: 0,
    gold: 0,
    notes: "",
};

const characterClasses: CharacterClass[] = [
    {
        id: 0,
        name: "Test 1",
        characterMatImageUrl:
            "/worldhaven/images/character-mats/gloomhaven/gh-brute.png",
    },
];

jest.mock("../../utils/data-loader", () => {
    return {
        loadCharacterClasses: jest.fn().mockImplementation(() => {
            return characterClasses;
        }),
    };
});

describe("Index", () => {
    it("renders", () => {
        render(
            <Index
                initialCharacter={character}
                characterClasses={characterClasses}
            />
        );

        const characterDetailsForm = screen.queryByRole("form", {
            name: "Character details form",
        });

        expect(characterDetailsForm).toBeInTheDocument();
    });
});

describe("getStaticProps", () => {
    it("loads character class data", async () => {
        const data: InferGetStaticPropsType<typeof getStaticProps> =
            await getStaticProps({});

        expect(data.props.characterClasses).toEqual(characterClasses);
    });

    it("returns an initial character", async () => {
        const data: InferGetStaticPropsType<typeof getStaticProps> =
            await getStaticProps({});

        expect(data.props.initialCharacter).toEqual(initialCharacter);
    });
});
