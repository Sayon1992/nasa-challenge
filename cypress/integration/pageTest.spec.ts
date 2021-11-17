import allPhotos from "../fixtures/curiosityPhotos.json";
/// <reference types="cypress" />

describe("Page Tests", () => {
  const firstPage = { photos: allPhotos.photos.slice(0, 25) };
  const findPhotos = (rover: "curiosity" | "spirit" | "opportunity") => {
    cy.intercept(
      "GET",
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?api_key=NBD5sDlSioyAga4sMCvf3Ia0sRZdygqo5KtmwCaH&page=1&earth_date=${new Date().toLocaleDateString(
        "en-CA"
      )}`,
      firstPage
    ).as(rover);
  };
  beforeEach(() => {
    findPhotos("curiosity");

    cy.visit("/");
  });
  it("should show title, selector menu in Curiosity, making call to endpoint and show first cards", () => {
    cy.get(".MuiTabs-flexContainer").children().should("have.length", 3);
    cy.get(".Mui-selected").should("have.text", "Curiosity");
    cy.get("[data-cy=title]").should("contain", "Mars Rover Photos");
  });
  it("should show date button and when date is selected, search by date(sol or earth)", () => {
    cy.get("#earthPicker").should("exist");
    cy.get('[data-cy="solPicker"]').should("exist");
    cy.get('[data-cy="photos-container"]').children().should("have.length", 25);
    cy.get("[data-testid=CalendarIcon]").click();
    cy.get(":nth-child(2) > :nth-child(1) > .MuiButtonBase-root").click();
    cy.get(".MuiInputBase-inputAdornedEnd").should(
      "not.have.value",
      new Date().toLocaleDateString("en-CA")
    );
  });
});

export {};
