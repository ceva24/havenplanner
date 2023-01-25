import Image from "@/components/core/image";

interface CardProps {
    src: string;
    altText: string;
}

const Card = ({ src, altText }: CardProps) => {
    return <CardImage src={src} altText={altText} width={240} height={320} />;
};

const SmallCard = ({ src, altText }: CardProps) => {
    return <CardImage src={src} altText={altText} width={165} height={244} />;
};

const WideCard = ({ src, altText }: CardProps) => {
    return <CardImage src={src} altText={altText} width={200} height={150} />;
};

interface CardImageProps extends CardProps {
    width: number;
    height: number;
}

const CardImage = ({ src, altText, width, height }: CardImageProps) => {
    return (
        <Image
            webpPath={src}
            fallbackImageType="jpg"
            altText={altText}
            width={width}
            height={height}
            style={{ borderRadius: "3%", minWidth: width, minHeight: height }}
        />
    );
};

export { Card, SmallCard, WideCard };
