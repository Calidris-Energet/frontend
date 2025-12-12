describe("Регистрация и профиль пользователя", () => {
    const TEST_USER = {
        name: "Трофим Семенов",
        email: "user@user.com",
        password: "1234",
        phone: "+79251411694",
    };

    beforeEach(() => {
        cy.setupAuthMocks();
        cy.viewport(1920, 1080);
    });

    it("Успешная авторизация и проверка данных профиля", () => {
        cy.register(
            TEST_USER.name,
            TEST_USER.phone,
            TEST_USER.email,
            TEST_USER.password
        );
        cy.verifyProfile(TEST_USER);
    });
});
