import { ParsedUrlQuery } from "node:querystring";
import { render, screen } from "@testing-library/react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { createMocks } from "node-mocks-http";
import Index, { getServerSideProps } from "@/pages/index";
import { characterClasses, defaultCharacter } from "@/utils/constants";
import * as characterService from "@/services/character";

describe("Index", () => {
    it("renders the tabs", () => {
        render(<Index initialCharacter={defaultCharacter} characterClasses={characterClasses} />);

        const profileTab = screen.getByRole("tab", { name: "Profile" });
        const deckTab = screen.getByRole("tab", { name: "Deck" });
        const perksTab = screen.getByRole("tab", { name: "Perks" });

        expect(profileTab).toBeInTheDocument();
        expect(deckTab).toBeInTheDocument();
        expect(perksTab).toBeInTheDocument();
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

        expect(data.props.initialCharacter).toEqual(defaultCharacter);
    });

    it("loads character details from the query string parameter", async () => {
        const character: Character = {
            name: "Test character",
            experience: 240,
            gold: 75,
            notes: "It's a test",
            characterClass: characterClasses[2],
        };

        jest.spyOn(characterService, "loadCharacter").mockImplementationOnce(() => character);

        const context: GetServerSidePropsContext = createMockContext({ character: "abc" });

        const data: InferGetServerSidePropsType<typeof getServerSideProps> = await getServerSideProps(context);

        expect(data.props.initialCharacter).toEqual(character);
    });

    it("returns the default character if loading the character from the query string parameter fails", async () => {
        jest.spyOn(characterService, "loadCharacter").mockImplementationOnce(() => {
            throw new Error("Error");
        });

        const context: GetServerSidePropsContext = createMockContext({ character: "abc" });

        const data: InferGetServerSidePropsType<typeof getServerSideProps> = await getServerSideProps(context);

        expect(data.props.initialCharacter).toEqual(defaultCharacter);
    });
});

const createMockContext = (query: ParsedUrlQuery): GetServerSidePropsContext => {
    return {
        ...createMocks(),
        query,
        resolvedUrl: "",
    };
};
