import { useState } from "react";
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { getDefaultSettings, getSettingsForGame, getSpoilerSettingsForCharacter } from "@/services/settings";
import { decode, type SaveData } from "@/services/share/codec";
import { hasSpoilers } from "@/services/spoiler";
import SettingsProvider from "@/hooks/use-settings";
import Header from "@/components/header/header";
import AppContainer from "@/components/app-container";
import LoadCharacterDialog from "@/components/load/load-character-dialog";

interface IndexProps {
    initialSettings: Settings;
    loadedCharacter?: Character;
    loadedSpoilerSettings?: SpoilerSettings;
}

const Index: NextPage<IndexProps> = ({ initialSettings, loadedCharacter, loadedSpoilerSettings }: IndexProps) => {
    const characterHasSpoilers: boolean = loadedCharacter ? hasSpoilers(loadedCharacter) : false;

    const initialCharacter: Character = determineInitialCharacter(
        loadedCharacter,
        characterHasSpoilers,
        initialSettings.gameData
    );

    const [character, setCharacter] = useState<Character>(initialCharacter);
    const [settings, setSettings] = useState<Settings>(initialSettings);

    return (
        <SettingsProvider settings={settings} setSettings={setSettings}>
            <Header character={character} setCharacter={setCharacter} />
            <AppContainer character={character} setCharacter={setCharacter} />
            <LoadCharacterDialog
                newSpoilerSettings={loadedSpoilerSettings ?? initialSettings.spoilerSettings}
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
    gameData: GameData
): Character => {
    return !loadedCharacter || characterHasSpoilers ? gameData.defaultCharacter : loadedCharacter;
};

const getServerSideProps: GetServerSideProps<IndexProps> = async (context: GetServerSidePropsContext) => {
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

export default Index;
export { getServerSideProps, determineInitialCharacter, type IndexProps };
