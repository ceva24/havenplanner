import reactStringReplace from "react-string-replace";
import Image from "@/components/core/image";

interface PerkDescriptionProps {
    perk: Perk;
}

const PerkDescription = ({ perk }: PerkDescriptionProps) => {
    return (
        <>
            {reactStringReplace(perk.description, /{(.*?)}/, (match: string, index: number) => (
                <Image
                    key={`${match}${index}`}
                    webpPath={`/images/perk-icons/gloomhaven/${match}.webp`}
                    fallbackImageType="png"
                    altText={`${match} icon`}
                    width={30}
                    height={30}
                    style={{ verticalAlign: "middle" }}
                />
            ))}
        </>
    );
};

export default PerkDescription;
