import { useState } from "react";
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import theme from "@/client/themes/default";
import ErrorTemplate from "@/client/components/error/error-template";
import { hasSpoilers } from "@/client/services/spoiler";
import SettingsProvider from "@/client/hooks/use-settings";
import Header from "@/client/components/header/header";
import AppContainer from "@/client/components/app-container";
import LoadCharacterDialog from "@/client/components/load/load-character-dialog";
import { useClearQueryString } from "@/client/hooks/use-clear-query-string";
import { getDefaultSettings, getSettingsForGame, getSpoilerSettingsForCharacter } from "@/server/services/settings";
import { decode } from "@/server/services/load/decoder";

interface GloomhavenPageProps {
    initialSettings: Settings;
    loadedCharacter?: Character;
    loadedSpoilerSettings?: SpoilerSettings;
}

const GloomhavenPage: NextPage<GloomhavenPageProps> = ({
    initialSettings,
    loadedCharacter,
    loadedSpoilerSettings,
}: GloomhavenPageProps) => {
    const characterHasSpoilers: boolean = loadedCharacter ? hasSpoilers(loadedCharacter) : false;

    const initialCharacter: Character = determineInitialCharacter(
        loadedCharacter,
        characterHasSpoilers,
        initialSettings.gameData
    );

    const [character, setCharacter] = useState<Character>(initialCharacter);
    const [settings, setSettings] = useState<Settings>(initialSettings);

    useClearQueryString();

    return (
        <>
            <Head>
                <title>Gloomhaven Character Planner - HavenPlanner</title>
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <SettingsProvider settings={settings} setSettings={setSettings}>
                    <Header title="Gloomhaven Character Planner" character={character} setCharacter={setCharacter} />
                    <ErrorBoundary fallback={<ErrorTemplate message="Sorry, an unexpected error has occurred" />}>
                        <AppContainer character={character} setCharacter={setCharacter} />
                        <LoadCharacterDialog
                            newSpoilerSettings={loadedSpoilerSettings ?? initialSettings.spoilerSettings}
                            characterHasSpoilers={characterHasSpoilers}
                            character={loadedCharacter ?? initialCharacter}
                            setCharacter={setCharacter}
                        />
                    </ErrorBoundary>
                </SettingsProvider>
            </ThemeProvider>
        </>
    );
};

const determineInitialCharacter = (
    loadedCharacter: Character | undefined,
    characterHasSpoilers: boolean,
    gameData: GameData
): Character => {
    return !loadedCharacter || characterHasSpoilers ? gameData.defaultCharacter : loadedCharacter;
};

const getServerSideProps: GetServerSideProps<GloomhavenPageProps> = async (context: GetServerSidePropsContext) => {
    const encodedCharacterData: string | string[] | undefined = context.query.character;

    if (typeof encodedCharacterData === "string") {
        try {
            const saveData: SaveData = decode(encodedCharacterData);

            const loadedSpoilerSettings = getSpoilerSettingsForCharacter(saveData.character, saveData.gameData);

            return {
                props: {
                    initialSettings: getSettingsForGame(saveData.gameData.game.id),
                    loadedCharacter: saveData.character,
                    loadedSpoilerSettings,
                },
            };
        } catch {}
    }

    return {
        props: {
            initialSettings: getDefaultSettings(),
        },
    };
};

export default GloomhavenPage;
export { getServerSideProps, determineInitialCharacter, type GloomhavenPageProps };
