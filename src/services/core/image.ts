const baseImageUrl = "https://images.havenplanner.app";

const createSafeRelativePath = (path: string) => {
    return path.startsWith("/") ? path : "/".concat(path);
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

export { baseImageUrl, createSafeRelativePath, createImageUrl };
