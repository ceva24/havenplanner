import Flippy, { FrontSide, BackSide } from "react-flippy";
import { createImageUrl } from "@/utils/images";

interface CharacterMatProps {
    characterClass: CharacterClass;
}

const CharacterMat = ({ characterClass }: CharacterMatProps) => {
    return (
        <Flippy style={{ width: "100%" }}>
            <FrontSide style={{ padding: 0, boxShadow: "none" }}>
                <img
                    src={createImageUrl(characterClass.characterMatFrontImageUrl)}
                    alt="Character mat front"
                    style={{ cursor: "pointer", maxWidth: "100%" }}
                />
            </FrontSide>
            <BackSide style={{ padding: 0, boxShadow: "none" }}>
                <img
                    src={createImageUrl(characterClass.characterMatBackImageUrl)}
                    alt="Character mat back"
                    style={{ cursor: "pointer", maxWidth: "100%" }}
                />
            </BackSide>
        </Flippy>
    );
};

export default CharacterMat;
