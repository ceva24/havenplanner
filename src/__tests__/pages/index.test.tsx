import type { ParsedUrlQuery } from "node:querystring";
import { render, screen } from "@testing-library/react";
import type { GetServerSidePropsContext } from "next";
import { createMocks } from "node-mocks-http";
import Index, { getServerSideProps, type IndexProps } from "@/pages/index";
import * as encoderService from "@/services/share/codec";
import { createTestSettings, createTestCharacter } from "@/test/create-test-fixtures";

jest.mock("next/router", () => {
    return {
        useRouter: jest.fn(),
    };
});

jest.mock("@/services/share/codec", () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
        __esModule: true,
        ...jest.requireActual("@/services/share/codec"),
    };
});

beforeEach(() => {
    jest.clearAllMocks();
});

const character: Character = createTestCharacter();
const settings: Settings = createTestSettings();

describe("index page", () => {
    it("renders the tabbed content", () => {
        render(<Index initialSettings={settings} />);

        const profileTab = screen.getByRole("tab", { name: "Profile" });

        expect(profileTab).toBeInTheDocument();
    });

    it("renders the share button", () => {
        render(<Index initialSettings={settings} />);

        const shareButton = screen.getByRole("button", { name: "Share" });

        expect(shareButton).toBeInTheDocument();
    });
});

describe("getServerSideProps", () => {
    it("returns the default settings", async () => {
        const data = (await getServerSideProps(createMockContext({}))) as { props: IndexProps };

        expect(data.props.initialSettings).toBeTruthy();
    });

    it("loads character details from the query string parameter", async () => {
        jest.spyOn(encoderService, "decode").mockReturnValueOnce(character);

        const context: GetServerSidePropsContext = createMockContext({ character: "abc" });

        const data = (await getServerSideProps(context)) as { props: IndexProps };

        expect(data.props.loadedCharacter).toEqual(character);
    });

    it("returns a default character if loading the character from the query string parameter fails", async () => {
        jest.spyOn(encoderService, "decode").mockImplementationOnce(() => {
            throw new Error("Error");
        });

        const context: GetServerSidePropsContext = createMockContext({ character: "abc" });

        const data = (await getServerSideProps(context)) as { props: IndexProps };

        expect(data.props.initialSettings.gameData.defaultCharacter).toBeTruthy();
    });
});

const createMockContext = (query: ParsedUrlQuery): GetServerSidePropsContext => {
    return {
        ...createMocks(),
        query,
        resolvedUrl: "",
    };
};
