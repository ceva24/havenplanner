import type { CSSProperties } from "react";
import { createSafeRelativePath } from "@/utils";

const baseImageUrl = "https://images.ghplanner.app";

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

const createImageUrl = (webpPath: string) => {
    if (isValidUrl(webpPath)) return webpPath;

    return baseImageUrl.concat(createSafeRelativePath(webpPath));
};

const isValidUrl = (webpPath: string) => {
    try {
        new URL(webpPath); // eslint-disable-line no-new
        return true;
    } catch {
        return false;
    }
};

export default Image;
export { baseImageUrl, createImageUrl };
