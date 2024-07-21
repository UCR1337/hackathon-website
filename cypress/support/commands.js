import { encode } from "next-auth/jwt";

const user = {
  name: {
    first: "USER",
    last: "TEST",
  },
  email: "user@test.com",
  image: "https://---.---",
  roles: {
    admins: 1,
    participants: 1,
  },
};

Cypress.Commands.add("fetch", ({ role, portal, page }) => {
  cy.intercept("/api/auth/session", user).as("session");
  cy.intercept(
    "GET",
    `/api/dashboard/${page}?direction=undefined&index=1&size=10&first=undefined&last=undefined`,
    {
      fixture: `${page}.json`,
    }
  ).as("GET");

  cy.log("HELLO", Cypress.env("NEXTAUTH_SECRET"));

  cy.wrap(null)
    .then(() =>
      encode({
        token: user,
        secret: Cypress.env("NEXTAUTH_SECRET"),
      })
    )
    .then((token) => cy.setCookie("next-auth.session-token", token));

  cy.visit("/");
  cy.wait("@session");

  cy.visit(`/${portal}/${page}`);
  cy.wait("@GET");
});

Cypress.Commands.add("action", ({ tag, page }) => {
  cy.intercept("PUT", `/api/dashboard/${page}`, {
    message: "OK",
    status: 200,
  }).as("PUT");
  cy.get('[data-cy="toolbar"]').find(`[data-cy="${tag}-tag"]`).click();
  cy.wait("@PUT");
});

Cypress.Commands.add("delete", ({ page }) => {
  cy.intercept("DELETE", `/api/dashboard/${page}?remove=*`, {
    message: "OK",
    status: 200,
  }).as("DELETE");
  cy.get('[data-cy="toolbar"]').find('[data-cy="delete"]').click();
  cy.get('[data-cy="popup"]').find('[data-cy="confirm-button"]').click();
  cy.wait("@DELETE");
});
