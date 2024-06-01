import type { Dispatch, SetStateAction } from "react";
import AbilityCardsTabContainer from "@/client/components/ability-cards/ability-cards-tab-container";

interface AbilityCardsProperties {
    readonly character: Character;
    readonly setCharacter: Dispatch<SetStateAction<Character>>;
}

const AbilityCards = ({ character, setCharacter }: AbilityCardsProperties) => {
    return <AbilityCardsTabContainer character={character} setCharacter={setCharacter} />;
};

export default AbilityCards;
