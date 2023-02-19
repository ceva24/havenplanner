import { useState } from "react";
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { decode } from "@/services/codec";
import { defaultCharacter } from "@/constants";
import Header from "@/components/header/header";
import AppContainer from "@/components/app-container";
import AppSettingsProvider from "@/hooks/use-app-settings";
import { useClearQueryString } from "@/hooks/use-clear-query-string";

interface IndexProps {
    initialCharacter: Character;
}

const Index: NextPage<IndexProps> = ({ initialCharacter }: IndexProps) => {
    const [character, setCharacter] = useState<Character>(initialCharacter);

    useClearQueryString();

    return (
        <AppSettingsProvider character={character}>
            <Header character={character} setCharacter={setCharacter} />
            <AppContainer character={character} setCharacter={setCharacter} />
        </AppSettingsProvider>
    );
};

const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    let character = defaultCharacter;

    const encodedCharacterData: string | string[] | undefined = context.query.character;

    if (typeof encodedCharacterData === "string") {
        try {
            character = decode(encodedCharacterData);
        } catch {}
    }

    return {
        props: {
            initialCharacter: character,
        },
    };
};

export default Index;
export { getServerSideProps };
