import { Box, Typography } from "@mui/material";
import Image from "@/components/core/image";

interface ItemSpoilerProps {
    text: string;
}

const ItemSpoiler = ({ text }: ItemSpoilerProps) => {
    return <Spoiler text={text} webpPath="/equip-slot-icons/gloomhaven/bag.webp" />;
};

interface SpoilerProps {
    text: string;
    webpPath: string;
}

const Spoiler = ({ text, webpPath }: SpoilerProps) => {
    return (
        <Box display="flex" gap={1}>
            <Image
                webpPath={webpPath}
                fallbackImageType="png"
                altText="Item"
                style={{ verticalAlign: "middle" }}
                height={30}
                width={30}
                aria-hidden="true"
            />
            <Typography component="span">{text}</Typography>
        </Box>
    );
};

export { ItemSpoiler };
