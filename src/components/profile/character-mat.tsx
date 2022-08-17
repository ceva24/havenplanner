import { KeyboardEvent, useRef } from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import AppImage from "@/components/app-image";

interface CharacterMatProps {
    characterClass: CharacterClass;
}

const CharacterMat = ({ characterClass }: CharacterMatProps) => {
    const ref = useRef<Flippy>();

    const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (["Space", "Enter"].includes(event.code)) {
            event.preventDefault();
            ref.current?.toggle();
        }
    };

    return (
        <Flippy ref={ref} style={{ width: "100%" }} tabindex="0" onKeyDown={onKeyDown}>
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
