import reactStringReplace from "react-string-replace";
import Image from "@/client/components/core/image";

interface RichPerkDescriptionProperties {
    readonly perk: Perk;
}

const RichPerkDescription = ({ perk }: RichPerkDescriptionProperties) => {
    return (
        <>
            {reactStringReplace(perk.name, /{(.*?)}/, (match: string, index: number) => (
                <Image
                    key={`${match}${index}`}
                    webpPath={`/perk-icons/gloomhaven/${match}.webp`}
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

export default RichPerkDescription;
