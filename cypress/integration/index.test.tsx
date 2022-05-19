describe("index page", () => {
    it("renders", () => {
        cy.visit("/");
    });

    it("sets the page title", () => {
        cy.visit("/");

        cy.title().should("equal", "Create Next App");
    });
});
