import { useState } from "react";
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { decode } from "@/services/share/codec";
import { hasSpoilers, spoilerSettingsForCharacter } from "@/services/load";
import SettingsProvider from "@/hooks/use-settings";
import Header from "@/components/header/header";
import AppContainer from "@/components/app-container";
import LoadCharacterDialog from "@/components/load/load-character-dialog";
import { getDefaultSettings } from "@/services/settings";

interface IndexProps {
    defaultSettings: Settings;
    loadedCharacter?: Character;
    loadedSpoilerSettings?: SpoilerSettings;
}

const Index: NextPage<IndexProps> = ({ defaultSettings, loadedCharacter, loadedSpoilerSettings }: IndexProps) => {
    const characterHasSpoilers: boolean = loadedCharacter ? hasSpoilers(loadedCharacter) : false;

    const initialCharacter: Character = determineInitialCharacter(
        loadedCharacter,
        characterHasSpoilers,
        defaultSettings.gameSettings
    );

    const [character, setCharacter] = useState<Character>(initialCharacter);
    const [settings, setSettings] = useState<Settings>(defaultSettings);

    return (
        <SettingsProvider settings={settings} setSettings={setSettings}>
            <Header character={character} setCharacter={setCharacter} />
            <AppContainer character={character} setCharacter={setCharacter} />
            <LoadCharacterDialog
                spoilerSettings={loadedSpoilerSettings ?? defaultSettings.spoilerSettings}
                characterHasSpoilers={characterHasSpoilers}
                character={loadedCharacter ?? initialCharacter}
                setCharacter={setCharacter}
            />
        </SettingsProvider>
    );
};

const determineInitialCharacter = (
    loadedCharacter: Character | undefined,
    characterHasSpoilers: boolean,
    defaultGameSettings: GameSettings
): Character => {
    return !loadedCharacter || characterHasSpoilers ? defaultGameSettings.defaultCharacter : loadedCharacter;
};

const getServerSideProps: GetServerSideProps<IndexProps> = async (context: GetServerSidePropsContext) => {
    let loadedCharacter: Character | undefined;
    let loadedSpoilerSettings: SpoilerSettings | undefined;

    const encodedCharacterData: string | string[] | undefined = context.query.character;

    if (typeof encodedCharacterData === "string") {
        try {
            loadedCharacter = decode(encodedCharacterData);
            loadedSpoilerSettings = spoilerSettingsForCharacter(loadedCharacter);
        } catch {
            loadedCharacter = undefined;
            loadedSpoilerSettings = undefined;
        }
    }

    return {
        props: {
            defaultSettings: getDefaultSettings(),
            ...(loadedCharacter && { loadedCharacter }),
            ...(loadedSpoilerSettings && { loadedSpoilerSettings }),
        },
    };
};

export default Index;
export { getServerSideProps, determineInitialCharacter };
