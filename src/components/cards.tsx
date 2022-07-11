import Image from "next/image";
import { CSSProperties } from "react";

interface CardProps {
    url: string;
    altText: string;
    styleProps?: CSSProperties;
}

const Card = (cardProps: CardProps) => {
    return CardImage(cardProps, 200, 300);
};

const ItemCard = (cardProps: CardProps) => {
    return CardImage(cardProps, 150, 225);
};

const CardImage = ({ url, altText, styleProps }: CardProps, width: number, height: number) => {
    return (
        <Image src={url} alt={altText} width={width} height={height} style={{ borderRadius: "2%", ...styleProps }} />
    );
};

export { Card, ItemCard };
