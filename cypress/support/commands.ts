import * as allure from "allure-js-commons";

Cypress.Commands.add("setupAuthMocks", () => {
    allure.epic("Authentication");
    allure.feature("API Mocking");

    cy.intercept("POST", "/api/auth/check/", {
        statusCode: 401,
        body: { message: "Unauthorized", statusCode: 401 },
    }).as("check");

    cy.intercept("GET", "/api/items/types", {
        statusCode: 200,
        body: [],
    }).as("types");

    cy.intercept("GET", "/api/items/producers", {
        statusCode: 200,
        body: [],
    }).as("producers");

    cy.intercept("GET", "/api/items?offset=0", {
        statusCode: 200,
        body: [],
    }).as("items");

    cy.intercept("GET", "/api/orders/draft/", {
        statusCode: 200,
    }).as("draftOrders");

    cy.intercept("POST", "/api/auth/login/", {
        statusCode: 200,
        body: {
            id: 1,
            email: "user@user.com",
            name: "Трофим Семенов",
            phone: "+79251411694",
            foreign: false,
            role: 0,
        },
    }).as("login");

    cy.intercept("POST", "/api/auth/register/", {
        statusCode: 200,
        body: {
            id: 1,
            email: "user@user.com",
            name: "Трофим Семенов",
            phone: "+79251411694",
            foreign: false,
            role: 0,
        },
    }).as("register");
});

// Команда для логина
Cypress.Commands.add("login", (email = "user@user.com", password = "1234") => {
    allure.epic("Authentication");
    allure.feature("User Login");
    allure.story("Successful Login");
    allure.severity(allure.Severity.BLOCKER);

    allure.step("Navigate to login page", () => {
        cy.visit("/login");
    });

    allure.step("Set localStorage flag for onboarding", () => {
        cy.window().then((win) => {
            win.localStorage.setItem("onb_shown", "true");
        });
    });

    allure.step("Click on login button to open form", () => {
        allure.description("Enter valid credentials");
        cy.get('[data-test-id="login"]').click();
    });

    allure.step("Fill email field", () => {
        cy.get('input[name="email"]').type(email);
    });

    allure.step("Fill password field", () => {
        cy.get('input[name="password"]').type(password);
    });

    allure.step("Submit login form", () => {
        allure.description("Click login button");
        cy.get('button[type="submit"]').click();
    });

    allure.step("Wait for login API call", () => {
        cy.wait("@login");
    });

    allure.step("Wait for auth check API call", () => {
        cy.wait("@check");
    });

    allure.step("Verify successful redirection to home page", () => {
        allure.description("Verify successful redirection");
        cy.url().should("include", "/");
    });
});

// Команда для логина
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
            cy.get('input[name="name"]').type("afs");
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
            cy.wait("@register");
        });

        allure.step("Wait for auth check API call", () => {
            cy.wait("@check");
        });

        allure.step("Verify successful redirection to home page", () => {
            allure.description("Verify successful redirection");
            cy.url().should("include", "/");
        });
    }
);

// Команда для проверки профиля
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
