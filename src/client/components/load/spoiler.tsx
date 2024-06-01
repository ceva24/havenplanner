import { Box, Typography } from "@mui/material";
import Image from "@/client/components/core/image";

interface CharacterSpoilerProperties {
    readonly characterClass: UnlockableCharacterClassSummary;
}

const CharacterSpoiler = ({ characterClass }: CharacterSpoilerProperties) => {
    return (
        <Spoiler
            text={characterClass.spoilerSafeName}
            altText={`${characterClass.spoilerSafeName} Class Icon`}
            webpPath={characterClass.imageUrl}
        />
    );
};

interface ItemSpoilerProperties {
    readonly text: string;
}

const ItemSpoiler = ({ text }: ItemSpoilerProperties) => {
    return <Spoiler text={text} altText="Item Spoiler Icon" webpPath="/equip-slot-icons/gloomhaven/bag.webp" />;
};

interface SpoilerProperties {
    readonly text: string;
    readonly altText: string;
    readonly webpPath: string;
}

const Spoiler = ({ text, altText, webpPath }: SpoilerProperties) => {
    return (
        <Box display="flex" justifyContent="center">
            <Image
                webpPath={webpPath}
                fallbackImageType="png"
                altText={altText}
                style={{ verticalAlign: "middle" }}
                height={30}
                width={30}
                aria-hidden="true"
            />
            <Typography width={200} overflow="hidden" textOverflow="ellipsis">
                {text}
            </Typography>
        </Box>
    );
};

export { ItemSpoiler, CharacterSpoiler };
