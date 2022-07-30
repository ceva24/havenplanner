const baseImageUrl = "https://ceva24.github.io";

const createImageUrl = (relativePath: string) => {
    const safeRelativePath = relativePath.startsWith("/") ? relativePath : `/${relativePath}`;

    return `${baseImageUrl}${safeRelativePath}`;
};

const defaultPersonalQuestCardImageUrl = "/worldhaven/images/personal-quests/gloomhaven/gh-pq-back.jpg";

export { createImageUrl, defaultPersonalQuestCardImageUrl };
