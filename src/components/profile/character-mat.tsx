import Image from "next/image";

interface CharacterMatProps {
    characterClass: CharacterClass;
}

const CharacterMat = ({ characterClass }: CharacterMatProps) => {
    return <Image src={characterClass.characterMatImageUrl} alt="Character mat" width={600} height={400} />;
};

export default CharacterMat;
