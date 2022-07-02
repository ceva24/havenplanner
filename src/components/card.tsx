import Image from "next/image";
import { CSSProperties } from "react";

interface CardProps {
    url: string;
    altText: string;
    styleProps?: CSSProperties;
}

const Card = ({ url, altText, styleProps }: CardProps) => {
    return <Image src={url} alt={altText} width={200} height={300} style={{ borderRadius: "2%", ...styleProps }} />;
};

export default Card;
