import * as allure from "allure-js-commons";

Cypress.Commands.add(
    "register",
    (
        name = "user",
        phone = "7923433234",
        email = "user@user.com",
        password = "1234"
    ) => {
        allure.epic("Registration");
        allure.feature("User Register");
        allure.story("Successful Register");
        allure.severity(allure.Severity.BLOCKER);

        allure.step("Navigate to register page", () => {
            cy.visit("/register");
        });

        allure.step("Set localStorage flag for onboarding", () => {
            cy.window().then((win) => {
                win.localStorage.setItem("onb_shown", "true");
            });
        });

        allure.step("Fill first name field", () => {
            cy.get('input[name="name"]').type(name);
        });

        allure.step("Fill email field", () => {
            cy.get('input[name="email"]').type(email);
        });

        allure.step("Fill phone phone", () => {
            cy.get('input[name="phone"]').type(phone);
        });

        allure.step("Fill password field", () => {
            cy.get('input[name="password"]').type(password);
        });

        allure.step("Fill repeat password field", () => {
            cy.get('input[name="repeatPassword"]').type(password);
        });

        allure.step("Submit register form", () => {
            allure.description("Click register button");
            cy.get('button[type="submit"]').click();
        });

        allure.step("Wait for register API call", () => {
            cy.wait("@registerSuccess");
        });

        allure.step("Verify successful redirection to home page", () => {
            allure.description("Verify successful redirection");
            cy.url().should("include", "/");
        });
    }
);
