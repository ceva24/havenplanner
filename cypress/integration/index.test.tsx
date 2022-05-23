/* eslint-disable import/no-unassigned-import */
import "@percy/cypress";
import "@testing-library/cypress/add-commands";

describe("index page", () => {
    it("renders", () => {
        cy.visit("/");

        cy.percySnapshot();
    });

    it("shows a list of classes in the class select list", () => {
        const characterClasses = [
            "None",
            "Brute",
            "Scoundrel",
            "Spellweaver",
            "Tinkerer",
            "Mindthief",
            "Cragheart",
        ];

        cy.visit("/");

        cy.findByRole("button", { name: "Class" }).click();

        const characterClassList = cy.findByRole("listbox", { name: "Class" });
        const characterClassOptions =
            characterClassList.findAllByRole("option");

        characterClassOptions.should("have.length", 7);

        characterClassOptions.each((characterClass, index) => {
            cy.wrap(characterClass).should(
                "have.text",
                characterClasses[index]
            );
        });
    });

    it("shows the character mat after selecting a class", () => {
        cy.visit("/");

        cy.findByRole("img", { name: "Character mat" }).should("not.exist");

        cy.findByRole("button", { name: "Class" }).click();

        cy.findByRole("listbox", { name: "Class" })
            .findByRole("option", { name: "Spellweaver" })
            .click();

        cy.findByRole("img", { name: "Character mat" }).should("be.visible");

        cy.percySnapshot();
    });
});
