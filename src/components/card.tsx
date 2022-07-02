import Image from "next/image";
import { CSSProperties } from "react";

interface CardProps {
    url: string;
    altText: string;
    onClick?: () => void;
    styleProps?: CSSProperties;
}

const Card = ({ url, altText, onClick, styleProps }: CardProps) => {
    return (
        <Image
            src={url}
            alt={altText}
            width={200}
            height={300}
            style={{ borderRadius: "2%", ...styleProps }}
            onClick={onClick}
        />
    );
};

export default Card;
