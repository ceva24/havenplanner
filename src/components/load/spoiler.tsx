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
            iconSize={45}
        />
    );
};

interface ItemSpoilerProps {
    text: string;
}

const ItemSpoiler = ({ text }: ItemSpoilerProps) => {
    return (
        <Spoiler
            text={text}
            altText="Item Spoiler Icon"
            webpPath="/equip-slot-icons/gloomhaven/bag.webp"
            iconSize={30}
        />
    );
};

interface SpoilerProps {
    text: string;
    altText: string;
    webpPath: string;
    iconSize: number;
}

const Spoiler = ({ text, altText, webpPath, iconSize }: SpoilerProps) => {
    return (
        <Box>
            <Image
                webpPath={webpPath}
                fallbackImageType="png"
                altText={altText}
                style={{ verticalAlign: "middle" }}
                height={iconSize}
                width={iconSize}
                aria-hidden="true"
            />
            <Typography component="span" paddingLeft={1}>
                {text}
            </Typography>
        </Box>
    );
};

export { ItemSpoiler, CharacterSpoiler };
