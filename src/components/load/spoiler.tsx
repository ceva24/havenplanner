import { Box, Typography } from "@mui/material";
import Image from "@/components/core/image";

interface CharacterSpoilerProps {
    characterClass: UnlockableCharacterClassSummary;
}

const CharacterSpoiler = ({ characterClass }: CharacterSpoilerProps) => {
    return (
        <Spoiler
            text={characterClass.spoilerSafeName}
            altText={`${characterClass.spoilerSafeName} Class Icon`}
            webpPath={characterClass.imageUrl}
        />
    );
};

interface ItemSpoilerProps {
    text: string;
}

const ItemSpoiler = ({ text }: ItemSpoilerProps) => {
    return <Spoiler text={text} altText="Item Spoiler Icon" webpPath="/equip-slot-icons/gloomhaven/bag.webp" />;
};

interface SpoilerProps {
    text: string;
    altText: string;
    webpPath: string;
}

const Spoiler = ({ text, altText, webpPath }: SpoilerProps) => {
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
