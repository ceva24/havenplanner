import Image from "next/image";

interface CharacterMatProps {
    characterClass: CharacterClass | undefined;
}

const CharacterMat = ({ characterClass }: CharacterMatProps) => {
    return characterClass ? (
        <Image
            src={characterClass.characterMatImageUrl}
            alt="Character mat"
            width={600}
            height={400}
        />
    ) : null;
};

export default CharacterMat;
