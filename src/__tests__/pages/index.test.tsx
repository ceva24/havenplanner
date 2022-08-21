import { ParsedUrlQuery } from "node:querystring";
import { render, screen } from "@testing-library/react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { createMocks } from "node-mocks-http";
import Index, { getServerSideProps } from "@/pages/index";
import * as encoderService from "@/services/encoder";
import { characterClasses } from "@/loaders/class";
import { defaultCharacter } from "@/utils/constants";

jest.mock("@/services/encoder", () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
        __esModule: true,
        ...jest.requireActual("@/services/encoder"),
    };
});

beforeEach(() => {
    jest.clearAllMocks();
});

describe("index page", () => {
    it("renders the tabbed content", () => {
        render(<Index initialCharacter={defaultCharacter} />);

        const profileTab = screen.getByRole("tab", { name: "Profile" });

        expect(profileTab).toBeInTheDocument();
    });

    it("renders the share button", () => {
        render(<Index initialCharacter={defaultCharacter} />);

        const shareButton = screen.getByRole("button", { name: "Share" });

        expect(shareButton).toBeInTheDocument();
    });
});

describe("getServerSideProps", () => {
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
            items: [],
            unlockedAbilityCards: [],
        };

        jest.spyOn(encoderService, "decode").mockImplementationOnce(() => character);

        const context: GetServerSidePropsContext = createMockContext({ character: "abc" });

        const data: InferGetServerSidePropsType<typeof getServerSideProps> = await getServerSideProps(context);

        expect(data.props.initialCharacter).toEqual(character);
    });

    it("returns the default character if loading the character from the query string parameter fails", async () => {
        jest.spyOn(encoderService, "decode").mockImplementationOnce(() => {
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
