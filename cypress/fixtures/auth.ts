export const authMocks = {
    unauthorized: {
        method: "POST",
        url: "/api/auth/check/",
        response: {
            statusCode: 401,
            body: { message: "Unauthorized", statusCode: 401 },
        },
    },

    loginSuccess: {
        method: "POST",
        url: "/api/auth/login/",
        response: {
            statusCode: 200,
            body: {
                id: 1,
                email: "user@user.com",
                name: "Трофим Семенов",
                phone: "+79251411694",
                foreign: false,
                role: 0,
            },
        },
    },
};
