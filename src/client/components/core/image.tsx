import type { CSSProperties } from "react";
import { createImageUrl } from "@/client/services/core/image";

interface ImageProperties {
    readonly webpPath: string;
    readonly fallbackImageType: "jpg" | "png";
    readonly altText: string;
    readonly width?: number;
    readonly height?: number;
    readonly style?: CSSProperties;
}

const Image = ({ webpPath, fallbackImageType, altText, ...properties }: ImageProperties) => {
    const fullImagePath = createImageUrl(webpPath);
    const fallbackImagePath = fullImagePath.replace(".webp", `.${fallbackImageType}`);

    return (
        <picture>
            <source srcSet={fullImagePath} type="image/webp" />
            <img src={fallbackImagePath} alt={altText} {...properties} />
        </picture>
    );
};

export default Image;
