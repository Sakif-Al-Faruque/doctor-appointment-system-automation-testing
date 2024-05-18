import AdminLoginPage from "../../pageObjects/admin/AdminLoginPage.js";
import ADMIN_LOGIN from "../../../data/admin/AdminLogin.js";
import Browser from "../../../framework/browser/Browser.js";
import {assert} from "chai";
import AdminDashboardPage from "../../pageObjects/admin/AdminDashboardPage.js";


describe("Admin Login", ()=>{
    it("Admin Login with valid credentials", async()=>{
        await Browser.openUrl(ADMIN_LOGIN.URL);
        await Browser.Window.resize(ADMIN_LOGIN.WINDOW_SIZE);
        
        assert.isTrue(await AdminLoginPage.isPageOpened(), "Admin Login Page is not opened yet");
        
        await AdminLoginPage.setLoginInformation(ADMIN_LOGIN.VALID.ADMIN_ID, ADMIN_LOGIN.VALID.ADMIN_PASSWORD);

        await AdminLoginPage.clickOnLoginButton();

        assert.isTrue(await AdminDashboardPage.isPageOpened(), "Admin could not login");
    });
});