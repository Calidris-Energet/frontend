import * as allure from "allure-js-commons";

Cypress.Commands.add("verifyProfile", (user) => {
    allure.epic("User Profile");
    allure.feature("Profile Information");
    allure.story("Verify Profile Data");
    allure.severity(allure.Severity.CRITICAL);

    allure.step("Navigate to profile section", () => {
        cy.get('[data-test-id="profile"]').click();
    });

    allure.step("Verify name field matches user data", () => {
        cy.get('input[id="profile-name-field"]').should(
            "have.value",
            user.name
        );
        allure.attachment("Expected Name", user.name, allure.ContentType.TEXT);
    });

    allure.step("Verify phone field matches user data", () => {
        cy.get('input[id="profile-phone-field"]').should(
            "have.value",
            user.phone
        );
        allure.attachment(
            "Expected Phone",
            user.phone,
            allure.ContentType.TEXT
        );
    });

    allure.step("Verify email field matches user data", () => {
        cy.get('input[id="profile-email-field"]').should(
            "have.value",
            user.email
        );
        allure.attachment(
            "Expected Email",
            user.email,
            allure.ContentType.TEXT
        );
    });
});
