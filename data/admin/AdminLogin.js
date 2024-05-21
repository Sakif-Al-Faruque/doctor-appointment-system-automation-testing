const ADMIN_LOGIN = {
    URL: `http://localhost/project/Doctor_Patient/applicationlayer/login3.php`,
    WINDOW_SIZE: { width: 1600, height: 1000 },
    VALID: {
        ADMIN_ID: "admin",
        ADMIN_PASSWORD: "admin"
    },
    INVALID_01: {
        ADMIN_ID: "a",
        ADMIN_PASSWORD: "admin",
        ERROR: "The ID/Password not correct"
    },
    INVALID_02: {
        ADMIN_ID: "##",
        ADMIN_PASSWORD: "admin",
        ERROR: "The ID/Password not correct"
    },
    INVALID_03: {
        ADMIN_ID: "1",
        ADMIN_PASSWORD: "admin",
        ERROR: "The ID/Password not correct"
    }
}

export default ADMIN_LOGIN;