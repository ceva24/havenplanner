const createSafeRelativePath = (path: string) => {
    return path.startsWith("/") ? path : "/".concat(path);
};

export { createSafeRelativePath };
