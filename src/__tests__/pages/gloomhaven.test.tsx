import type { ParsedUrlQuery } from "node:querystring";
import { render, screen } from "@testing-library/react";
import type { GetServerSidePropsContext } from "next";
import { createMocks } from "node-mocks-http";
import GloomhavenPage, { getServerSideProps, type GloomhavenPageProps } from "@/pages/gloomhaven";
import * as decoderService from "@/server/services/load/decoder";
import * as settingsService from "@/server/services/settings";
import { createTestSettings, createTestCharacter } from "@/test/create-test-fixtures";

jest.mock("next/router", () => {
    return {
        useRouter: jest.fn(),
    };
});

jest.mock("@/server/services/load/decoder");

jest.mock("@/server/services/settings");

beforeEach(() => {
    jest.clearAllMocks();
});

const character: Character = createTestCharacter();
const settings: Settings = createTestSettings();

describe("gloomhaven page", () => {
    it("renders the tabbed content", () => {
        render(<GloomhavenPage initialSettings={settings} />);

        const profileTab = screen.getByRole("tab", { name: "Profile" });

        expect(profileTab).toBeInTheDocument();
    });

    it("renders the share button", () => {
        render(<GloomhavenPage initialSettings={settings} />);

        const shareButton = screen.getByRole("button", { name: "Share" });

        expect(shareButton).toBeInTheDocument();
    });
});

describe("getServerSideProps", () => {
    it("returns the default settings when there is no save data to load", async () => {
        const getDefaultSettingsImplementation = jest.fn();

        jest.spyOn(settingsService, "getDefaultSettings").mockImplementationOnce(() => {
            getDefaultSettingsImplementation();
            return settings;
        });

        const data = (await getServerSideProps(createMockContext({}))) as { props: GloomhavenPageProps };

        expect(getDefaultSettingsImplementation).toHaveBeenCalledTimes(1);
        expect(data.props.initialSettings).toEqual(settings);
    });

    it("returns no loaded character or spoiler settings when there is no save data to load", async () => {
        const data = (await getServerSideProps(createMockContext({}))) as { props: GloomhavenPageProps };

        expect(data.props.loadedCharacter).toBeFalsy();
        expect(data.props.loadedSpoilerSettings).toBeFalsy();
    });

    it("loads character details from the query string parameter", async () => {
        jest.spyOn(decoderService, "decode").mockReturnValueOnce({ character, gameData: settings.gameData });
        jest.spyOn(settingsService, "getSettingsForGame").mockReturnValueOnce(settings);

        const context: GetServerSidePropsContext = createMockContext({ character: "abc" });

        const data = (await getServerSideProps(context)) as { props: GloomhavenPageProps };

        expect(data.props.loadedCharacter).toEqual(character);
    });

    it("loads spoiler settings based on the save data in the query string", async () => {
        jest.spyOn(decoderService, "decode").mockReturnValueOnce({ character, gameData: settings.gameData });
        jest.spyOn(settingsService, "getSpoilerSettingsForCharacter").mockReturnValueOnce(settings.spoilerSettings);
        jest.spyOn(settingsService, "getSettingsForGame").mockReturnValueOnce(settings);

        const context: GetServerSidePropsContext = createMockContext({ character: "abc" });

        const data = (await getServerSideProps(context)) as { props: GloomhavenPageProps };

        expect(data.props.loadedSpoilerSettings).toEqual(settings.spoilerSettings);
    });

    it("creates initial based on the save data in the query string", async () => {
        jest.spyOn(decoderService, "decode").mockReturnValueOnce({ character, gameData: settings.gameData });
        jest.spyOn(settingsService, "getSettingsForGame").mockReturnValueOnce(settings);

        const context: GetServerSidePropsContext = createMockContext({ character: "abc" });

        const data = (await getServerSideProps(context)) as { props: GloomhavenPageProps };

        expect(data.props.initialSettings).toEqual(settings);
    });

    it("returns a default character if loading the character from the query string parameter fails", async () => {
        jest.spyOn(decoderService, "decode").mockImplementationOnce(() => {
            throw new Error("Error");
        });

        jest.spyOn(settingsService, "getDefaultSettings").mockReturnValueOnce(settings);

        const context: GetServerSidePropsContext = createMockContext({ character: "abc" });

        const data = (await getServerSideProps(context)) as { props: GloomhavenPageProps };

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
