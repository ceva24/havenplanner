import { CSSProperties } from "react";

const baseImageUrl = "https://ceva24.github.io";

interface ImageProps {
    webpPath: string;
    fallbackImageType: "jpg" | "png";
    altText: string;
    width?: number;
    height?: number;
    style?: CSSProperties;
}

const AppImage = ({ webpPath, fallbackImageType, altText, ...props }: ImageProps) => {
    const fullImagePath = createImageUrl(webpPath);
    const fallbackImagePath = webpPath.replace(".webp", `.${fallbackImageType}`);

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

export default AppImage;
export { createImageUrl };
