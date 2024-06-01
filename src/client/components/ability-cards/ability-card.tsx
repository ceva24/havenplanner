import { Card } from "@/client/components/core/cards";
import { determineAbilityCardImageUrl } from "@/client/services/ability-cards/ability-card";

interface AbilityCardProperties {
    readonly abilityCard: AbilityCard;
    readonly character: Character;
}

const AbilityCard = ({ abilityCard, character }: AbilityCardProperties) => {
    return <Card src={determineAbilityCardImageUrl(abilityCard, character)} altText={abilityCard.name} />;
};

export default AbilityCard;
