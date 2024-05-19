import AdminLoginPage from "../../pageObjects/admin/AdminLoginPage.js";
import ADMIN_LOGIN from "../../../data/admin/AdminLogin.js";
import Browser from "../../../framework/browser/Browser.js";
import {assert} from "chai";
import AdminDashboardPage from "../../pageObjects/admin/AdminDashboardPage.js";
import allureReporter from '@wdio/allure-reporter';

describe("validate admin login", ()=>{
    it("validate admin can login with valid credentials", async()=>{
        allureReporter.addSeverity("critical");
        
        allureReporter.addStep("Opening the web app in the browser");
        await Browser.openUrl(ADMIN_LOGIN.URL);

        allureReporter.addStep("Resize window");
        await Browser.Window.resize(ADMIN_LOGIN.WINDOW_SIZE);
        
        assert.isTrue(await AdminLoginPage.isPageOpened(), "Admin Login Page is not opened yet");
        
        allureReporter.addStep("Set login info");
        await AdminLoginPage.setLoginInformation(ADMIN_LOGIN.VALID.ADMIN_ID, ADMIN_LOGIN.VALID.ADMIN_PASSWORD);

        allureReporter.addStep("Click on login button");
        await AdminLoginPage.clickOnLoginButton();

        allureReporter.addStep("Direct admin to dashboard");
        assert.isTrue(await AdminDashboardPage.isPageOpened(), "Admin could not login");

        await AdminDashboardPage.clickOnLogout();
        await Browser.Window.refresh();
    });

    it("validate admin cannot login with chars in UserID field", async()=>{
        allureReporter.addSeverity("minor");
        
        allureReporter.addStep("Opening the web app in the browser");
        await Browser.openUrl(ADMIN_LOGIN.URL);

        allureReporter.addStep("Resize window");
        await Browser.Window.resize(ADMIN_LOGIN.WINDOW_SIZE);
        
        assert.isTrue(await AdminLoginPage.isPageOpened(), "Admin Login Page is not opened yet");
        
        allureReporter.addStep("Set login info");
        await AdminLoginPage.setLoginInformation(ADMIN_LOGIN.INVALID_01.ADMIN_ID, ADMIN_LOGIN.INVALID_01.ADMIN_PASSWORD);

        allureReporter.addStep("Click on login button");
        await AdminLoginPage.clickOnLoginButton();

        allureReporter.addStep("Error Message is displayed");
        assert.strictEqual(await AdminLoginPage.getErrorText(), ADMIN_LOGIN.INVALID_01.ERROR, "No error or invalid error");

        await Browser.Window.refresh();
    });

    it("validate admin cannot login with special chars in UserID field", async()=>{
        allureReporter.addSeverity("minor");
        
        allureReporter.addStep("Opening the web app in the browser");
        await Browser.openUrl(ADMIN_LOGIN.URL);

        allureReporter.addStep("Resize window");
        await Browser.Window.resize(ADMIN_LOGIN.WINDOW_SIZE);
        
        assert.isTrue(await AdminLoginPage.isPageOpened(), "Admin Login Page is not opened yet");
        
        allureReporter.addStep("Set login info");
        await AdminLoginPage.setLoginInformation(ADMIN_LOGIN.INVALID_02.ADMIN_ID, ADMIN_LOGIN.INVALID_02.ADMIN_PASSWORD);

        allureReporter.addStep("Click on login button");
        await AdminLoginPage.clickOnLoginButton();

        allureReporter.addStep("Error Message is displayed");
        assert.strictEqual(await AdminLoginPage.getErrorText(), ADMIN_LOGIN.INVALID_02.ERROR, "No error or invalid error");

        await Browser.Window.refresh();
    });

    it("validate admin cannot login with invalid password", async()=>{
        allureReporter.addSeverity("minor");
        
        allureReporter.addStep("Opening the web app in the browser");
        await Browser.openUrl(ADMIN_LOGIN.URL);

        allureReporter.addStep("Resize window");
        await Browser.Window.resize(ADMIN_LOGIN.WINDOW_SIZE);
        
        assert.isTrue(await AdminLoginPage.isPageOpened(), "Admin Login Page is not opened yet");
        
        allureReporter.addStep("Set login info");
        await AdminLoginPage.setLoginInformation(ADMIN_LOGIN.INVALID_03.ADMIN_ID, ADMIN_LOGIN.INVALID_03.ADMIN_PASSWORD);

        allureReporter.addStep("Click on login button");
        await AdminLoginPage.clickOnLoginButton();

        allureReporter.addStep("Error Message is displayed");
        assert.strictEqual(await AdminLoginPage.getErrorText(), ADMIN_LOGIN.INVALID_03.ERROR, "No error or invalid error");

        await Browser.Window.refresh();
    });
});