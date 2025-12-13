describe("Авторизация и профиль пользователя", () => {
    const TEST_USER = {
        email: "user@user.com",
        password: "1234",
        name: "Трофим Семенов",
        phone: "+79251411694",
    };

    beforeEach(() => {
        cy.setupAuthMocks("unauthorized");
        cy.viewport(1920, 1080);
    });

    it("Успешная авторизация и проверка данных профиля", () => {
        cy.login(TEST_USER.email, TEST_USER.password);
        cy.verifyProfile(TEST_USER);
    });
});
