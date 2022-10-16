import Image from "@/components/core/image";

interface CardProps {
    src: string;
    altText: string;
}

const Card = ({ src, altText }: CardProps) => {
    return (
        <Image
            webpPath={src}
            fallbackImageType="jpg"
            altText={altText}
            width={240}
            height={320}
            style={{ maxWidth: "100%", borderRadius: "3%" }}
        />
    );
};

const SmallCard = ({ src, altText }: CardProps) => {
    return (
        <Image
            webpPath={src}
            fallbackImageType="jpg"
            altText={altText}
            width={165}
            height={244}
            style={{ borderRadius: "3%" }}
        />
    );
};

const WideCard = ({ src, altText }: CardProps) => {
    return (
        <Image
            webpPath={src}
            fallbackImageType="jpg"
            altText={altText}
            width={200}
            height={150}
            style={{ borderRadius: "3%" }}
        />
    );
};

export { Card, SmallCard, WideCard };
