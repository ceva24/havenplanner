import type { ParsedUrlQuery } from "node:querystring";
import { render, screen } from "@testing-library/react";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { createMocks } from "node-mocks-http";
import Index, { getServerSideProps } from "@/pages/index";
import * as encoderService from "@/services/codec";
import { defaultCharacter, defaultSpoilerSettings } from "@/constants";
import { createTestCharacter } from "@/testutils";

jest.mock("next/router", () => {
    return {
        useRouter: jest.fn(),
    };
});

jest.mock("@/services/codec", () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
        __esModule: true,
        ...jest.requireActual("@/services/codec"),
    };
});

beforeEach(() => {
    jest.clearAllMocks();
});

describe("index page", () => {
    it("renders the tabbed content", () => {
        render(
            <Index
                initialCharacter={defaultCharacter}
                spoilerSettings={defaultSpoilerSettings}
                characterHasSpoilers={false}
            />
        );

        const profileTab = screen.getByRole("tab", { name: "Profile" });

        expect(profileTab).toBeInTheDocument();
    });

    it("renders the share button", () => {
        render(
            <Index
                initialCharacter={defaultCharacter}
                spoilerSettings={defaultSpoilerSettings}
                characterHasSpoilers={false}
            />
        );

        const shareButton = screen.getByRole("button", { name: "Share" });

        expect(shareButton).toBeInTheDocument();
    });

    it("renders the load character dialog", () => {
        render(
            <Index characterHasSpoilers initialCharacter={defaultCharacter} spoilerSettings={defaultSpoilerSettings} />
        );

        const shareButton = screen.getByRole("dialog", { name: "Load character?" });

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
        const character: Character = createTestCharacter();

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
