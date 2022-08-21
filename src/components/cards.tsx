import AppImage from "@/components/app-image";

interface CardProps {
    src: string;
    altText: string;
}

const Card = ({ src, altText }: CardProps) => {
    return (
        <AppImage
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
        <AppImage
            webpPath={src}
            fallbackImageType="jpg"
            altText={altText}
            width={150}
            height={225}
            style={{ borderRadius: "3%" }}
        />
    );
};

export { Card, SmallCard };
