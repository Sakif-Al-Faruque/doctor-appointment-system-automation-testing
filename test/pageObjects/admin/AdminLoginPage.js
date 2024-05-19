import BasePage from "../../../framework/page/BasePage.js";
import {Button, Input, Label} from "../../../framework/elements/index.js";
import {PreciseTextLocator} from "../../../framework/utils/locatorHelper.js";

class AdminLoginPage extends BasePage{
    constructor(){
        super(new Label(PreciseTextLocator("Admin Login"), "Admin Login Header"), "Unique element of Admin Login page");

        this.adminIdInputField = new Input(`[name="adminID"]`);
        this.adminPasswordInputField = new Input(`[name="adminpassword"]`);
        this.adminLoginButton = new Button(`[name="Login3"]`);
        this.adminLoginError = new Label(`[class="error"] p`);
    }

    async setLoginInformation(adminId, adminPassword){
        await this.adminIdInputField.typeText(adminId);
        await this.adminPasswordInputField.typeText(adminPassword);
    }

    async clickOnLoginButton(){
        await this.adminLoginButton.click();
    }

    async getErrorText(){
        return await this.adminLoginError.getText();
    }
}

export default new AdminLoginPage();