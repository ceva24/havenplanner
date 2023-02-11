import Image from "@/components/core/image";

interface CardProps {
    src: string;
    altText: string;
}

const Card = ({ src, altText }: CardProps) => {
    return <CardImage src={src} altText={altText} width={300} height={400} />;
};

const SmallCard = ({ src, altText }: CardProps) => {
    return <CardImage src={src} altText={altText} width={200} height={296} />;
};

const WideCard = ({ src, altText }: CardProps) => {
    return <CardImage src={src} altText={altText} width={225} height={168.75} />;
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
