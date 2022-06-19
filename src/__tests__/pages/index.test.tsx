import { render } from "@testing-library/react";
import { InferGetStaticPropsType } from "next";
import Index, { getStaticProps } from "../../pages/index";

const initialCharacter: Character = {
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
        const { asFragment } = render(
            <Index
                initialCharacter={initialCharacter}
                characterClasses={characterClasses}
            />
        );

        expect(asFragment()).toMatchSnapshot();
    });
});

describe("getStaticProps", () => {
    it("loads character class data", async () => {
        const data: InferGetStaticPropsType<typeof getStaticProps> =
            await getStaticProps({});

        expect(data.props.characterClasses).toEqual(characterClasses);
    });
});
