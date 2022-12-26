import type { Dispatch, SetStateAction } from "react";
import AbilityCardsTabContainer from "@/components/ability-cards/ability-cards-tab-container";

interface AbilityCardsProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const AbilityCards = ({ character, setCharacter }: AbilityCardsProps) => {
    return <AbilityCardsTabContainer character={character} setCharacter={setCharacter} />;
};

export default AbilityCards;
