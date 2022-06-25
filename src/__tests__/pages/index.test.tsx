import { ParsedUrlQuery } from "node:querystring";
import { render, screen } from "@testing-library/react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { createMocks } from "node-mocks-http";
import Index, { getServerSideProps } from "@/pages/index";
import { characterClasses, initialCharacter } from "@/utils/constants";
import * as loadCharacterService from "@/services/character/load";

describe("Index", () => {
    it("renders", () => {
        render(<Index initialCharacter={initialCharacter} characterClasses={characterClasses} />);

        const characterDetailsForm = screen.queryByRole("form", {
            name: "Character details form",
        });

        expect(characterDetailsForm).toBeInTheDocument();
    });
});

describe("getServerSideProps", () => {
    it("loads character class data", async () => {
        const data: InferGetServerSidePropsType<typeof getServerSideProps> = await getServerSideProps(
            createMockContext({})
        );

        expect(data.props.characterClasses).toEqual(characterClasses);
    });

    it("returns the default character", async () => {
        const data: InferGetServerSidePropsType<typeof getServerSideProps> = await getServerSideProps(
            createMockContext({})
        );

        expect(data.props.initialCharacter).toEqual(initialCharacter);
    });

    it("loads character details from the query string parameter", async () => {
        const character: Character = {
            name: "Test character",
            experience: 240,
            gold: 75,
            notes: "It's a test",
            characterClass: characterClasses[2],
        };

        jest.spyOn(loadCharacterService, "loadCharacter").mockImplementationOnce(() => character);

        const context: GetServerSidePropsContext = createMockContext({ character: "abc" });

        const data: InferGetServerSidePropsType<typeof getServerSideProps> = await getServerSideProps(context);

        expect(data.props.initialCharacter).toEqual(character);
    });

    it("returns the default character if loading the character from the query string parameter fails", async () => {
        jest.spyOn(loadCharacterService, "loadCharacter").mockImplementationOnce(() => {
            throw new Error("Error");
        });

        const context: GetServerSidePropsContext = createMockContext({ character: "abc" });

        const data: InferGetServerSidePropsType<typeof getServerSideProps> = await getServerSideProps(context);

        expect(data.props.initialCharacter).toEqual(initialCharacter);
    });
});

const createMockContext = (query: ParsedUrlQuery): GetServerSidePropsContext => {
    return {
        ...createMocks(),
        query,
        resolvedUrl: "",
    };
};
