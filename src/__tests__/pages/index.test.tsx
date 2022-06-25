import { render, screen } from "@testing-library/react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Index, { getServerSideProps } from "@/pages/index";
import { characterClasses, initialCharacter } from "@/utils/constants";

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
        const data: InferGetServerSidePropsType<typeof getServerSideProps> = await getServerSideProps({
            query: {},
        } as GetServerSidePropsContext);

        expect(data.props.characterClasses).toEqual(characterClasses);
    });

    it("returns an initial character", async () => {
        const data: InferGetServerSidePropsType<typeof getServerSideProps> = await getServerSideProps({
            query: {},
        } as GetServerSidePropsContext);

        expect(data.props.initialCharacter).toEqual(initialCharacter);
    });
});
