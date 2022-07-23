import Image from "next/image";
import Flippy, { FrontSide, BackSide } from "react-flippy";

interface CharacterMatProps {
    characterClass: CharacterClass;
}

const CharacterMat = ({ characterClass }: CharacterMatProps) => {
    return (
        <Flippy style={{ cursor: "pointer" }}>
            <FrontSide style={{ padding: 0 }}>
                <Image
                    src={characterClass.characterMatFrontImageUrl}
                    alt="Character mat front"
                    width={600}
                    height={400}
                />
            </FrontSide>
            <BackSide style={{ padding: 0 }}>
                <Image
                    src={characterClass.characterMatBackImageUrl}
                    alt="Character mat back"
                    width={600}
                    height={400}
                />
            </BackSide>
        </Flippy>
    );
};

export default CharacterMat;
