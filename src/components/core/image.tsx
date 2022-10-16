import type { CSSProperties } from "react";
import { baseImageUrl } from "@/constants";

interface ImageProps {
    webpPath: string;
    fallbackImageType: "jpg" | "png";
    altText: string;
    width?: number;
    height?: number;
    style?: CSSProperties;
}

const Image = ({ webpPath, fallbackImageType, altText, ...props }: ImageProps) => {
    const fullImagePath = createImageUrl(webpPath);
    const fallbackImagePath = fullImagePath.replace(".webp", `.${fallbackImageType}`);

    return (
        <picture>
            <source srcSet={fullImagePath} type="image/webp" />
            <img src={fallbackImagePath} alt={altText} {...props} />
        </picture>
    );
};

const createImageUrl = (relativePath: string) => {
    const safeRelativePath = relativePath.startsWith("/") ? relativePath : `/${relativePath}`;

    return `${baseImageUrl}${safeRelativePath}`;
};

export default Image;
export { createImageUrl };
