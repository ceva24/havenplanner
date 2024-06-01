import type { KeyboardEvent } from "react";
import { useRef } from "react";
import Flippy, { BackSide, FrontSide } from "@ceva24/react-flippy";
import Image from "@/client/components/core/image";

interface CharacterMatProperties {
    readonly characterClass: CharacterClass;
}

const CharacterMat = ({ characterClass }: CharacterMatProperties) => {
    const reference = useRef<Flippy>();

    const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (["Space", "Enter"].includes(event.code)) {
            event.preventDefault();
            reference.current?.toggle();
        }
    };

    return (
        <Flippy ref={reference} tabIndex="0" onKeyDown={onKeyDown}>
            <FrontSide style={{ padding: 0, boxShadow: "none" }}>
                <Image
                    webpPath={characterClass.characterMatFrontImageUrl}
                    fallbackImageType="jpg"
                    altText="Character mat front"
                    style={{ cursor: "pointer", maxWidth: "100%" }}
                />
            </FrontSide>
            <BackSide style={{ padding: 0, boxShadow: "none" }}>
                <Image
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
