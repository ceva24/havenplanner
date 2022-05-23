import { loadCharacterClasses } from "../../utils/data-loader";

describe("data loader", () => {
    it("loads character class data", () => {
        const characterClasses = loadCharacterClasses();

        expect(characterClasses).toMatchSnapshot();
    });
});
