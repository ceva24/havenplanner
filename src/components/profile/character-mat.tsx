import Flippy, { FrontSide, BackSide } from "react-flippy";
import AppImage from "@/components/app-image";

interface CharacterMatProps {
    characterClass: CharacterClass;
}

const CharacterMat = ({ characterClass }: CharacterMatProps) => {
    return (
        <Flippy style={{ width: "100%" }}>
            <FrontSide style={{ padding: 0, boxShadow: "none" }}>
                <AppImage
                    webpPath={characterClass.characterMatFrontImageUrl}
                    fallbackImageType="jpg"
                    altText="Character mat front"
                    style={{ cursor: "pointer", maxWidth: "100%" }}
                />
            </FrontSide>
            <BackSide style={{ padding: 0, boxShadow: "none" }}>
                <AppImage
                    webpPath={characterClass.characterMatBackImageUrl}
                    fallbackImageType="jpg"
                    altText="Character mat back"
                    style={{ cursor: "pointer", maxWidth: "100%" }}
                />
            </BackSide>
        </Flippy>
    );
};

export default CharacterMat;
