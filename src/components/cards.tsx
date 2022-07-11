import Image from "next/image";
import { CSSProperties } from "react";

interface CardProps {
    src: string;
    altText: string;
    styleProps?: CSSProperties;
}

const Card = (cardProps: CardProps) => {
    return CardImage(cardProps, 200, 300); // eslint-disable-line new-cap
};

const ItemCard = (cardProps: CardProps) => {
    return CardImage(cardProps, 150, 225); // eslint-disable-line new-cap
};

const CardImage = ({ src, altText, styleProps }: CardProps, width: number, height: number) => {
    return (
        <Image src={src} alt={altText} width={width} height={height} style={{ borderRadius: "2%", ...styleProps }} />
    );
};

export { Card, ItemCard };
