import { render, screen } from "@testing-library/react";
import ExperienceField from "@/client/components/profile/experience-field";
import { createTestCharacter } from "@/test/create-test-fixtures";

describe("experience field", () => {
    it("renders", () => {
        render(
            <ExperienceField
                character={createTestCharacter({ experience: 25 })}
                setCharacter={jest.fn()}
                handleChange={jest.fn()}
            />,
        );

        const experienceField = screen.queryByRole("textbox", { name: "Experience" });

        expect(experienceField).toBeInTheDocument();
        expect(experienceField).toHaveValue("25");
    });
});
