describe("template spec", () => {
    it("passes", () => {
        cy.viewport(1920, 1080);

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
        }).as("items");

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

        cy.visit("http://localhost:3000/login");

        cy.window().then((win) => {
            win.localStorage.setItem("onb_shown", "true");
        });

        cy.get('[data-test-id="login"]').click();

        cy.get('input[name="email"]').type("user@user.com");

        cy.get('input[name="password"]').type("1234");

        cy.get('button[type="submit"]').click();

        cy.wait("@login");

        cy.wait("@check");

        cy.url().should("include", "/");

        cy.get('[data-test-id="profile"]').click();

        cy.get('input[id="profile-name-field"]').should(
            "have.value",
            "Трофим Семенов"
        );
        cy.get('input[id="profile-phone-field"]').should(
            "have.value",
            "+79251411694"
        );
        cy.get('input[id="profile-email-field"]').should(
            "have.value",
            "user@user.com"
        );
    });
});
