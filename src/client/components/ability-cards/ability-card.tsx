import { Card } from "@/client/components/core/cards";
import { determineAbilityCardImageUrl } from "@/client/services/ability-cards/enhancement";

interface AbilityCardProps {
    abilityCard: AbilityCard;
    character: Character;
}

const AbilityCard = ({ abilityCard, character }: AbilityCardProps) => {
    return <Card src={determineAbilityCardImageUrl(abilityCard, character)} altText={abilityCard.name} />;
};

export default AbilityCard;
