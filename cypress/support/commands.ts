Cypress.Commands.add("setupAuthMocks", () => {
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
});

// Команда для логина
Cypress.Commands.add("login", (email = "user@user.com", password = "1234") => {
    cy.visit("/login");

    cy.window().then((win) => {
        win.localStorage.setItem("onb_shown", "true");
    });

    cy.get('[data-test-id="login"]').click();
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.wait("@login");
    cy.wait("@check");

    cy.url().should("include", "/");
});

// Команда для проверки профиля
Cypress.Commands.add("verifyProfile", (user) => {
    cy.get('[data-test-id="profile"]').click();

    cy.get('input[id="profile-name-field"]').should("have.value", user.name);

    cy.get('input[id="profile-phone-field"]').should("have.value", user.phone);

    cy.get('input[id="profile-email-field"]').should("have.value", user.email);
});
