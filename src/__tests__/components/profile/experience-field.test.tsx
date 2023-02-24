import { render, screen } from "@testing-library/react";
import ExperienceField from "@/components/profile/experience-field";
import { createTestCharacter } from "@/testutils";

describe("experience field", () => {
    it("renders", () => {
        render(
            <ExperienceField
                character={createTestCharacter({ experience: 25 })}
                setCharacter={jest.fn()}
                handleChange={jest.fn()}
            />
        );

        const experienceField = screen.queryByRole("textbox", { name: "Experience" });

        expect(experienceField).toBeInTheDocument();
        expect(experienceField).toHaveValue("25");
    });
});
