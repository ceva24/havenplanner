import { useState } from "react";
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { decode } from "@/services/share/codec";
import { hasSpoilers, spoilerSettingsForCharacter } from "@/services/spoiler";
import { defaultAppSettings, defaultCharacter, defaultSpoilerSettings } from "@/constants";
import AppSettingsProvider from "@/hooks/use-app-settings";
import Header from "@/components/header/header";
import AppContainer from "@/components/app-container";
import LoadCharacterDialog from "@/components/spoiler/load-character-dialog";

interface IndexProps {
    initialCharacter: Character;
    spoilerSettings: SpoilerSettings;
    characterHasSpoilers: boolean;
}

const Index: NextPage<IndexProps> = ({ initialCharacter, spoilerSettings, characterHasSpoilers }: IndexProps) => {
    const [character, setCharacter] = useState<Character>(characterHasSpoilers ? defaultCharacter : initialCharacter);
    const [appSettings, setAppSettings] = useState<AppSettings>(defaultAppSettings);

    return (
        <AppSettingsProvider appSettings={appSettings} setAppSettings={setAppSettings}>
            <Header character={character} setCharacter={setCharacter} />
            <AppContainer character={character} setCharacter={setCharacter} />
            <LoadCharacterDialog
                spoilerSettings={spoilerSettings}
                characterHasSpoilers={characterHasSpoilers}
                character={initialCharacter}
                setCharacter={setCharacter}
            />
        </AppSettingsProvider>
    );
};

const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    let initialCharacter: Character = defaultCharacter;
    let spoilerSettings: SpoilerSettings = defaultSpoilerSettings;

    const encodedCharacterData: string | string[] | undefined = context.query.character;

    if (typeof encodedCharacterData === "string") {
        try {
            initialCharacter = decode(encodedCharacterData);
            spoilerSettings = spoilerSettingsForCharacter(initialCharacter);
        } catch {}
    }

    return {
        props: {
            initialCharacter,
            spoilerSettings,
            characterHasSpoilers: hasSpoilers(initialCharacter),
        },
    };
};

export default Index;
export { getServerSideProps };
