import { render, screen } from "@testing-library/react";
import { InferGetStaticPropsType } from "next";
import Index, { getStaticProps } from "../../pages/index";
import { characterClasses, initialCharacter } from "../../utils/constants";

describe("Index", () => {
    it("renders", () => {
        render(<Index initialCharacter={initialCharacter} characterClasses={characterClasses} />);

        const characterDetailsForm = screen.queryByRole("form", {
            name: "Character details form",
        });

        expect(characterDetailsForm).toBeInTheDocument();
    });
});

describe("getStaticProps", () => {
    it("loads character class data", async () => {
        const data: InferGetStaticPropsType<typeof getStaticProps> = await getStaticProps({});

        expect(data.props.characterClasses).toEqual(characterClasses);
    });

    it("returns an initial character", async () => {
        const data: InferGetStaticPropsType<typeof getStaticProps> = await getStaticProps({});

        expect(data.props.initialCharacter).toEqual(initialCharacter);
    });
});
