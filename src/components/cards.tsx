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
            style={{ maxWidth: "100%", borderRadius: "2%" }}
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
            style={{ borderRadius: "2%" }}
        />
    );
};

export { Card, SmallCard };
