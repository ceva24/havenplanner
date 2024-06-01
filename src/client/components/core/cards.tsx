import Image from "@/client/components/core/image";

interface CardProperties {
    readonly src: string;
    readonly altText: string;
}

const Card = ({ src, altText }: CardProperties) => {
    return <CardImage src={src} altText={altText} width={300} height={400} />;
};

const SmallCard = ({ src, altText }: CardProperties) => {
    return <CardImage src={src} altText={altText} width={200} height={296} />;
};

const WideCard = ({ src, altText }: CardProperties) => {
    return <CardImage src={src} altText={altText} width={225} height={168.75} />;
};

interface CardImageProperties extends CardProperties {
    readonly width: number;
    readonly height: number;
}

const CardImage = ({ src, altText, width, height }: CardImageProperties) => {
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
